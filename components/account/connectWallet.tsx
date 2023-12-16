'use client';
import { Provider, useWallet } from '@txnlab/use-wallet';
import { useEffect, Fragment, forwardRef } from 'react';
import { useLocalWallet } from '@/app/_context';
import { Dialog, Transition } from '@headlessui/react';
const ConnectWallet = () => {
  const { providers, activeAddress } = useWallet();
  const { openWalletModal: openModal, toggleWalletModal: closeModal } =
    useLocalWallet();

  const isKmd = (provider: Provider) =>
    provider.metadata.name.toLowerCase() === 'kmd';
  useEffect(() => {
    if (activeAddress) {
      // closeModal(false);
    }
  }, [activeAddress]);
  return (
    <>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="modal-box flex items-center justify-center flex-col px-5 bg-white rounded-2xl w-[35%]">
                  <Dialog.Title className="font-bold text-2xl text-black">
                    Select wallet provider
                  </Dialog.Title>

                  <div className="grid m-2 pt-5 w-full">
                    {providers?.map((provider) => (
                      <button
                        data-test-id={`${provider.metadata.id}-connect`}
                        className="bg-purple-600 hover:bg-purple-300 btn m-2 rounded-lg cursor-pointer flex gap-4 items-center justify-center my-5 py-5"
                        key={`provider-${provider.metadata.id}`}
                        onClick={() => {
                          return provider.connect();
                        }}
                      >
                        {!isKmd(provider) && (
                          <img
                            alt={`wallet_icon_${provider.metadata.id}`}
                            src={provider.metadata.icon}
                            style={{
                              objectFit: 'contain',
                              width: '24px',
                              height: 'auto',
                            }}
                          />
                        )}
                        <span className="font-bold text-white text-[24px]">
                          {isKmd(provider)
                            ? 'LocalNet Wallet'
                            : provider.metadata.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="modal-action grid">
                    <button
                      data-test-id="close-wallet-modal"
                      type="button"
                      className="mb-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ConnectWallet;
