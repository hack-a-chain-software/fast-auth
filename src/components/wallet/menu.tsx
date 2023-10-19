import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { Square2StackIcon, PowerIcon, MagnifyingGlassIcon, BanknotesIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { shortenAddress } from '@/helpers';
import { useWallet } from '@/stores/wallet';

export const WalletMenu = () => {
  const {
    accountId,
    signOut,
    toggleModal,
  } = useWallet();

  const logout = async () => {
    await signOut();
  };

  return (
    <Menu as="div" className="relative text-left hidden md:inline-block ml-8">
      <Menu.Button
        as="div"
        className="hover:opacity-80 cursor-pointer"
      >
        <UserCircleIcon
          className={
            twMerge(
              'text-white w-8',
              !!autenticated && 'text-[#A500FB]',
            )
          }
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="div"
          className="
            absolute
            right-0
            mt-2
            origin-top-right
            rounded-[16px]
            bg-white
            shadow-[0px_4px_30px_rgba(0,0,0,0.25)]
            focus:outline-none
            w-[304px]
            overflow-hidden
          "
        >
          {
            autenticated && accountId ? (
              <>
                <div className="py-[14px] px-[24px]">
                  <CopyToClipboard
                    text={accountId}
                    onCopy={() => toast.success('Copy to clipboard')}
                  >
                    <button className="inline-flex px-[16px] py-[10px] border border-[rgba(0,0,0,0.2)] rounded-[10px] space-x-[16px] hover:bg-[rgba(0,0,0,0.02)]">
                      <span
                        children={shortenAddress(accountId as string)}
                        className="text-[#1A1A1A] text-[14px] font-[500]"
                      />

                      <Square2StackIcon className="w-[24px] text-[rgba(26,26,26,0.5)]" />
                    </button>
                  </CopyToClipboard>
                </div>

                <Menu.Item>
                  {({ close }) => (
                    <div>
                      <button
                        onClick={() => {
                          onShowModal('lockedTokens');
                          close();
                        }}
                        className="pt-[19px] px-[24px] pb-[21px] w-full hover:bg-[#A500FB]/[0.10] flex items-center space-x-[8px] text-black "
                      >
                        <BanknotesIcon
                          className="w-[18px]"
                        />

                        <span className="font-[400] text-[14px]">My Locked Tokens</span>
                      </button>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ close }) => (
                    <div>
                      <button
                        onClick={() => {
                          onShowModal('gameClues');
                          close();
                        }}
                        className="pt-[19px] px-[24px] pb-[21px] w-full hover:bg-[#A500FB]/[0.10] flex items-center space-x-[8px] text-black "
                      >
                        <MagnifyingGlassIcon
                          className="w-[18px]"
                        />

                        <span className="font-[400] text-[14px]">My Clues</span>
                      </button>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ close }) => (
                    <div>
                      <button
                        onClick={() => {
                          onShowModal('guesses');
                          close();
                        }}
                        className="pt-[19px] px-[24px] pb-[21px] w-full hover:bg-[#A500FB]/[0.10] flex items-center space-x-[8px] text-black "
                      >
                        <ChatBubbleBottomCenterTextIcon
                          className="w-[18px]"
                        />

                        <span className="font-[400] text-[14px]">My Guesses</span>
                      </button>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  <div>
                    <button
                      onClick={() => void logout()}
                      className="pt-[19px] px-[24px] pb-[21px] w-full rounded-b-[16px] hover:bg-[#DB2B1F]/[0.65] flex items-center space-x-[8px] text-[#DB2B1F] hover:text-white"
                    >
                      <PowerIcon
                        className="w-[18px]"
                      />

                      <span className="font-[400] text-[14px]">Disconnect</span>
                    </button>
                  </div>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item>
                <div>
                  <button
                    onClick={() => toggleModal()}
                    className="pt-[19px] px-[24px] pb-[21px] w-full rounded-b-[16px] hover:bg-[#A500FB]/[0.65] flex items-center space-x-[8px] text-[#A500FB] hover:text-white"
                  >
                    <ArrowLeftOnRectangleIcon
                      className="w-[18px]"
                    />

                    <span className="font-[400] text-[14px]">Connect Wallet</span>
                  </button>
                </div>
              </Menu.Item>
            )
          }
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default WalletMenu;
