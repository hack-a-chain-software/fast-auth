import { create } from 'zustand';
import { keyStores } from 'near-api-js';
import { WalletStoreInterface } from '@/interfaces';
import { network } from '@/constants';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';

export const useWallet = create<WalletStoreInterface>((set, get) => ({
  accountId: null,
  selector: null,
  showWalletModal: false,

  toggleModal: () => {
    const {
      showWalletModal,
    } = get();

    set(() => ({ showWalletModal: !showWalletModal }));
  },

  initWallet: async () => {
    const newSelector = await setupWalletSelector({
      network: network,
      debug: true,
      modules: [setupMyNearWallet(), setupNearWallet()],
    });

    console.log('newSelector', newSelector)

    const state = newSelector.store.getState();

    const newAccount =
      state?.accounts.find((account) => account.active)?.accountId || '';

    try {
      set(() => ({
        accountId: newAccount,
        selector: newSelector,
      }));
    } catch (e) {
      console.warn(e);

      return '';
    }

    return newAccount;
  },

  signOut: async () => {
    const {
      selector,
    } = get();

    if (!selector) {
      return;
    }

    const wallet = await selector.wallet();

    try {
      await wallet.signOut();
    } catch (e) {
      console.warn(e);

      return;
    }

    set(() => ({ accountId: '' }));
  },

  getLoginPayload: async ({ accountId } = get()) => {
    const keystore = new keyStores.BrowserLocalStorageKeyStore();

    let keypair;

    if (accountId) {
      keypair = await keystore.getKey(
        network as string,
        accountId as string,
      );
    }

    const textEncoder = new TextEncoder();

    const message = textEncoder.encode(JSON.stringify(
      { timestampMs: Date.now() },
    ));

    let signature, publicKey;

    if (keypair && accountId) {
      const signed = keypair.sign(message);

      signature = signed.signature;
      publicKey = signed.publicKey;
    }

    return {
      accountId: accountId as string,
      seasonId: 'KDWOQPKDOQPDKWQOP' as string,
      signedMessage: {
        message: message.toString(),
        signature: signature?.toString(),
        publicKey: publicKey?.toString(),
      },
    };
  },
}));
