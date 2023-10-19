import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
// import { useWalletSelector } from '@/context/wallet';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import type { ModuleState } from '@near-wallet-selector/core';
import { useWallet } from '@/stores/wallet';

export function WalletModal() {
  const { selector, showWalletModal, toggleModal } = useWallet();

  const [modules, setModules] = useState<ModuleState[]>([]);

  useEffect(() => {
    const subscription = selector?.store.observable.subscribe((state) => {
      state.modules.sort((current, next) => {
        if (current.metadata.deprecated === next.metadata.deprecated) {
          return 0;
        }

        return current.metadata.deprecated ? 1 : -1;
      });

      setModules(state.modules);
    });

    return () => subscription?.unsubscribe();
  }, [selector]);

  const handleWalletClick = async (module: ModuleState) => {
    try {
      const { available } = module.metadata;

      if (module.type === 'injected' && !available) {
        return;
      }

      const wallet = await module.wallet();

      if (wallet.type === 'hardware') {
        return;
      }

      await wallet.signIn({
        contractId: '919b75639a8f705a084bgame.testnet',
        methodNames: [],
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <Transition appear show={showWalletModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => toggleModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-[24px] text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col mb-[24px]">
                  <span className="text-black text-[18px] font-[400]">
                    Connect Wallet
                  </span>
                </div>

                <div className="flex flex-col rounded-[12px] border border-[#e0e1e4] divide-y-black overflow-hidden">
                  {modules.map((module) => (
                    <button
                      key={'wallet-selector-modal-module' + module.id}
                      onClick={() => void handleWalletClick(module)}
                      className="
                        p-[16px] flex items-center hover:bg-white hover:text-purple-0 border-b border-[#e0e1e4]
                      "
                    >
                      <div className="flex">
                        <img
                          src={module.metadata.iconUrl}
                          className="w-[20px] mr-[12px]"
                        />

                        <span
                          children={module.metadata.name}
                          className="text-[14px] font-[400]"
                        />
                      </div>

                      <ChevronRightIcon className="h-[14px] ml-auto text-current" />
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
