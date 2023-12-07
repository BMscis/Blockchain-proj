'use client';
import { Provider, useWallet } from '@txnlab/use-wallet';
import { useEffect } from 'react';
import { useLocalWallet } from '@/app/_context';

const ConnectWallet = () => {
  const { providers, activeAddress } = useWallet();
  const { openWalletModal: openModal, toggleWalletModal: closeModal } =
    useLocalWallet();
  const isKmd = (provider: Provider) =>
    provider.metadata.name.toLowerCase() === 'kmd';

  useEffect(() => {
    if (activeAddress) {
      closeModal(false);
    }
  }, [activeAddress]);
  return (
    <dialog
      id="connect_wallet_modal"
      className={`modal ${
        openModal ? 'modal-open w-[500px] h-[600px] mt-[30px] rounded-lg' : ''
      }`}
      style={{ display: openModal ? 'block' : 'none' }}
    >
      <form
        method="dialog"
        className="modal-box flex items-center justify-center flex-col px-10"
      >
        <h3 className="font-bold text-2xl">Select wallet provider</h3>

        <div className="grid m-2 pt-5 w-full">
          {providers?.map((provider) => (
            <button
              data-test-id={`${provider.metadata.id}-connect`}
              className="bg-slate-600 hover:bg-slate-500 btn border-teal-800 border-2  m-2 rounded-lg cursor-pointer flex gap-9 items-center justify-center my-5 py-10 w-full"
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
                    width: '30px',
                    height: 'auto',
                  }}
                />
              )}
              <span className="font-bold text-white text-[24px]">
                {isKmd(provider) ? 'LocalNet Wallet' : provider.metadata.name}
              </span>
            </button>
          ))}
        </div>

        <div className="modal-action grid">
          <button
            data-test-id="close-wallet-modal"
            className="btn"
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default ConnectWallet;
