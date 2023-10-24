import { Buffer } from 'buffer';
import base64 from '@hexagon/base64';
import { eddsa as EDDSA } from 'elliptic';
import { Sha256 } from '@aws-crypto/sha256-js';
import { KeyPair } from '@near-js/crypto';
import { baseEncode } from 'borsh';
import { Fido2 } from './fido2';
import { HDKey } from "ethereum-cryptography/hdkey";
import { toHex } from "ethereum-cryptography/utils";

const f2l: Fido2 = new Fido2();

const CHALLENGE_TIMEOUT_MS = 90 * 1000;
const RP_NAME = 'NEAR_API_JS_WEBAUTHN';

const init: () => Promise<void> = async () => {
  await f2l.init({
      rpId: location.hostname,
      rpName: RP_NAME,
      timeout: CHALLENGE_TIMEOUT_MS,
  });
};

export const preformatMakeCredReq = (makeCredReq) => {
  const challenge = base64.toArrayBuffer(makeCredReq.challenge, true);
  const userId = base64.toArrayBuffer(makeCredReq.user.id, true);

  return {
      ...makeCredReq,
      challenge,
      user: {
          ...makeCredReq.user,
          id: userId,
      },
      ...(makeCredReq.excludeCredentials ? {
          excludeCredentials: makeCredReq.excludeCredentials.map((e) => {
              return { id: base64.toArrayBuffer(e.id, true), type: e.type };
          })
      } : {})
  };
};

export const get64BytePublicKeyFromPEM = (publicKey: any) => {
  const prefix = '\n';
  const publicKeyBase64 = publicKey.toString().split(prefix);
  return base64.toArrayBuffer(`${publicKeyBase64[1]}${publicKeyBase64[2]}`).slice(27);
};

export const validateUsername = (name: string): string => {
  if (!name) {
      throw new Error('username is required');
  }
  return name;
};

function setBufferIfUndefined() {
  if (window && !window.Buffer) {
      window.Buffer = Buffer;
  }
}

export const createKey = async (username: string, type: 'eth' | 'near' = 'near'): Promise<any> => {
  const cleanUserName = validateUsername(username);

  console.log('cleanUserName', cleanUserName)

  if (!f2l.f2l) {
      await init();
  }

  const id = base64.fromString(cleanUserName, true);

  const challengeMakeCred = await f2l.registration({
      username: cleanUserName,
      displayName: cleanUserName,
      id,
  });

  const publicKey = preformatMakeCredReq(challengeMakeCred);

  setBufferIfUndefined();

  return navigator.credentials.create({ publicKey })
      .then(async (res) => {
          const result = await f2l.attestation({
              clientAttestationResponse: res,
              origin,
              challenge: challengeMakeCred.challenge
          });

          const publicKey = result.authnrData.get('credentialPublicKeyPem');

          const publicKeyBytes = get64BytePublicKeyFromPEM(publicKey);

          if (type === 'near') {
            const ed = new EDDSA('ed25519');

            const edSha256 = new Sha256();

            edSha256.update(Buffer.from(publicKeyBytes));

            const key = ed.keyFromSecret(await edSha256.digest());

            return KeyPair.fromString(baseEncode(new Uint8Array(Buffer.concat([key.getSecret(), Buffer.from(key.getPublic())]))));
          }

          const hdkey = HDKey.fromMasterSeed(new Uint8Array(publicKeyBytes));

          return {
            hdkey,
            pubkey: '0x' + toHex(hdkey.publicKey as Uint8Array),
            pvtkey: '0x' + toHex(hdkey.privateKey as Uint8Array),
          }
      });
};
