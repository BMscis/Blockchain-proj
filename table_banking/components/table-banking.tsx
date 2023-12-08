import { useGroup } from '@/app/group/_context';
import { addFunds } from '@/utils/client';
import { routes } from '@/utils/routes';
import { Dialog, Transition } from '@headlessui/react';
import { useWallet } from '@txnlab/use-wallet';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';

export default function TableBanking() {
  const { appID } = useGroup();
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [amount, setAmount] = useState(0);
  const { signer, activeAddress } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const onSubmit = async () => {
    if (!activeAddress) {
      enqueueSnackbar('Please connect wallet first', {
        variant: 'warning',
      });
      return false;
    }
    const transactionSigner = { addr: activeAddress, signer };

    const funds = await addFunds({
      amount: amount,
      appID,
      transactionSigner,
      snack: enqueueSnackbar,
    });
    router.push(`${routes.groupID}?id=${appID}`);
    return funds;
  };
  return (
    <div className="p-8">
      <div className=" box-border w-[714.29px] h-px border-t-[1px] border-soli border-slate-600 " />
      <div className=" grid grid-cols-3 gap-8">
        <button
          className="cursor-pointer [border:none] p-0 bg-blueviolet hover:bg-purple-900 relative rounded-lg px-10 py-2"
          id="save"
          onClick={() => {
            setOpenWalletModal(!openWalletModal);
          }}
        >
          <div className=" text-xl font-semibold font-raleway text-white text-center">
            Save
          </div>
        </button>
        <button
          className="cursor-pointer [border:none] p-0 bg-mediumvioletred hover:bg-pink-600 relative rounded-lg px-10 py-2"
          id="takeloan"
        >
          <div className=" text-xl font-semibold font-raleway text-white text-center">
            Take a Loan
          </div>
        </button>
        <button
          className="cursor-pointer [border:none] p-0 bg-black hover:bg-gray relative rounded-lg px-10 py-2"
          id="payloan"
        >
          <div className="text-xl font-semibold font-raleway text-white text-center">
            Pay Loan
          </div>
        </button>
      </div>
      <Contribute
        openModal={openWalletModal}
        closeModal={setOpenWalletModal}
        onSubmit={onSubmit}
        setAmount={setAmount}
      />
    </div>
  );
}

function Contribute({
  openModal,
  closeModal,
  onSubmit,
  setAmount,
}: {
  openModal: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => Promise<boolean>;
  setAmount: Dispatch<SetStateAction<number>>;
}) {
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
                <Dialog.Panel className="bg-white px-30 max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all font-raleway">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Please enter how much you <br /> want to{' '}
                    <span className="text-blueviolet">SAVE</span>
                  </Dialog.Title>
                  <form className="relative">
                    <PassCodeInput setAmount={setAmount} />
                    <PassCodeButton onSubmit={onSubmit} />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function PassCodeInput({
  setAmount,
}: {
  setAmount: Dispatch<SetStateAction<number>>;
}) {
  return (
    <input
      type="text"
      placeholder="Enter Amount"
      className="relative rounded-[43.63px] p-5 bg-white box-border w-full h-[35px] overflow-hidden text-left text-gray font-raleway border-[0.9px] border-solid border-gray"
      onInput={(e: any) => {
        setAmount(e.target.value);
      }}
    ></input>
  );
}
function PassCodeButton({ onSubmit }: { onSubmit: () => Promise<boolean> }) {
  return (
    <button
      type="button"
      className="absolute top-0 right-0 font-semibold rounded-[48px] bg-blueviolet overflow-hidden flex flex-row items-center justify-center  py-5 w-[100px] text-center text-white font-raleway cursor-pointer shadow hover:bg-blue-500"
      onClick={onSubmit}
    >
      Save
    </button>
  );
}
