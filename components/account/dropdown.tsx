import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Account from './account';
import { useWallet } from '@txnlab/use-wallet';

export function OpenWallet() {
  const [userName, setUserName] = useState('Jane');
  const { activeAddress } = useWallet();
  const [image, setImage] = useState('/frame-38@2x.png');
  useEffect(() => {
    if (!activeAddress) return;
    if (
      activeAddress !==
      'SJQAHBFSNUDR2JCVPGBXPSBK2F2ZZ4VTDSJ3HE2L7O4HN46WD6KQFNGX3A'
    ) {
      setUserName('Asha');
      setImage('/frame-591@2x.png');
    }
  }, [activeAddress]);
  return (
    <div className="flex flex-row items-center justify-start gap-[9px] text-[28.38px] font-inter">
      <div className="flex flex-row items-center justify-start gap-[16px]">
        <div className="relative">{userName}</div>
        <img
          className="relative rounded-81xl w-12 h-12 overflow-hidden shrink-0 object-cover"
          alt=""
          src={image}
        />
      </div>
      <button
        className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-6 h-6 overflow-hidden shrink-0"
        id="dropdown"
      >
        <img
          className="absolute h-[33.33%] w-[58.33%] top-[33.33%] right-[20.83%] bottom-[33.33%] left-[20.83%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/vector.svg"
        />
      </button>
    </div>
  );
}

export default function AccountDropDown() {
  const { providers } = useWallet();
  return (
    <div className=" w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <OpenWallet />
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
            <div className="px-1 py-1 ">
              <Menu.Item>{({ active }) => <Account />}</Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      if (providers) {
                        const activeProvider = providers.find(
                          (p) => p.isActive
                        );
                        if (activeProvider) {
                          activeProvider.disconnect();
                        } else {
                          // Required for logout/cleanup of inactive providers
                          // For instance, when you login to localnet wallet and switch network
                          // to testnet/mainnet or vice verse.
                          localStorage.removeItem('txnlab-use-wallet');
                          window.location.reload();
                        }
                      }
                    }}
                  >
                    <Logout
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function Logout(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
      />
    </svg>
  );
}
