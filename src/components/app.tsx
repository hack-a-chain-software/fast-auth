import { Toaster } from 'react-hot-toast';
import { Fragment, useState } from "react";
import Content from "../components/Content";
import ExportContent from "../components/ExportContent";
import { WalletSelectorContextProvider } from "../contexts/WalletSelectorContext";
import { ExportAccountSelectorContextProvider } from "../contexts/WalletSelectorExportContext";
import { createKey } from '@/services/fast';

export const App = () => {
  const [showImport, setShowImport] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [kp, setKp] = useState<any>(null)
  const [type, setType] = useState<any>('eth')

  const generateKeysFromEmail = async (_type) => {
    setKp(null)
    setType(_type)
    const res = await createKey(email, _type);

    console.log('createKey', res)

    setKp(res)
  }

  return (
    <Fragment>
        <div className="title-container">
          <h1>{showImport ? "Export Account" : "NEAR Guest Book"}</h1>
          <button onClick={() => setShowImport(!showImport)}>
            {showImport ? "Back to Log in" : "Try Export Account"}
          </button>
        </div>
        {showImport ? (
          <ExportAccountSelectorContextProvider>
            <ExportContent />
          </ExportAccountSelectorContextProvider>
        ) : (
          <WalletSelectorContextProvider>
            <Content />
            <div
              className="pt-32"
            >
              <div>
                <span>
                  Use your email to generate a new NEAR account keypair
                </span>
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  className="border-b-transparent  rounded-[8px]  mt-2 bg-transparent py-2 text-xs"
                />
              </div>

              <div
                className="pt-4 space-x-2"
              >
                <button
                  onClick={() => generateKeysFromEmail('eth')}
                >
                  Eth
                </button>

                <button
                  onClick={() => generateKeysFromEmail('near')}
                >
                  Near
                </button>
              </div>

              {kp && type === 'near' && (
                <div
                  className='pt-4'
                >
                  <div
                    className='space-x-2'
                  >
                    <span
                      className='text-xs'
                    >
                      Secret:
                    </span>

                    <span
                      className='text-xs'
                    >
                      {kp && kp.secretKey}
                    </span>
                  </div>

                  <div
                    className='space-x-2'
                  >
                    <span
                      className='text-xs'
                    >
                      Pubkey:
                    </span>

                    <span
                      className='text-xs'
                    >
                      {kp && kp.publicKey.toString()}
                    </span>
                  </div>
                </div>
              )}

              {kp && type === 'eth' && (
                <div
                  className='pt-4'
                >
                  <div
                    className='space-x-2'
                  >
                    <span
                      className='text-xs'
                    >
                      Secret:
                    </span>

                    <span
                      className='text-xs'
                    >
                      {kp && kp.pvtkey}
                    </span>
                  </div>

                  <div
                    className='space-x-2'
                  >
                    <span
                      className='text-xs'
                    >
                      Pubkey:
                    </span>

                    <span
                      className='text-xs'
                    >
                      {kp && kp.pubkey}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </WalletSelectorContextProvider>
        )}

      <div
        className="relative z-[999999999999999999999]"
      >
        <Toaster />
      </div>
    </Fragment>
  );
};
