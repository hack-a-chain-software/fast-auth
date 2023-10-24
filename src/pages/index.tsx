import { useEffect, useReducer } from 'react';
import { useWallet } from '@/stores/wallet';

export const Index = () => {
  const {
    initWallet,
    toggleModal,
  } = useWallet();


  useEffect(() => {
    void (async () => {

      await initWallet();
    })();
  }, [initWallet]);

	return (
    <div>

      <div
        className="bg-black h-screen w-screen flex items-center justify-center"
      >
        <button
          onClick={() => toggleModal()}
          className="bg-white rounded-[8px] px-3 py-4 hover:opacity-80"
        >
          Connect Wallet
        </button>
      </div>

      <div>
        <input
          type="text"
          className="border-2 border-black"
        />
      </div>
    </div>
	);
};

export default Index;
