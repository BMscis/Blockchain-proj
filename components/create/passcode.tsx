import { routes } from '@/utils/routes';
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, Dispatch, SetStateAction } from 'react';

export default function PassCode() {
  let [isOpen, setIsOpen] = useState(true);
  const [appID, setAppID] = useState<number>(0);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const onSubmit = async (e: any) => {
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
                    Please enter your passcode <br /> to join the{' '}
                    <span className="text-blueviolet">GROUP</span>
                  </Dialog.Title>
                  <form className="relative">
                    <PassCodeInput setAppID={setAppID} />
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
// function Panel() {
//   return (
//     <Dialog.Panel className="max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all font-raleway">
//       <Dialog.Title
//         as="h3"
//         className="text-lg font-bold leading-6 text-gray-900"
//       >
//         Please enter your passcode to join the{' '}
//         <span color="text-blueviolet">GROUP</span>
//       </Dialog.Title>
//       <div className="relative bg-black">
//         <PassCodeInput />
//         <PassCodeButton />
//       </div>
//     </Dialog.Panel>
//   );
// }

function PassCodeInput({
  setAppID,
}: {
  setAppID: Dispatch<SetStateAction<number>>;
}) {
  return (
    <input
      type="text"
      placeholder="Enter passcode"
      className="relative rounded-[43.63px] p-5 bg-white box-border w-full h-[35px] overflow-hidden text-left text-gray font-raleway border-[0.9px] border-solid border-gray"
      onInput={(e: any) => {
        setAppID(e.target.value);
      }}
    ></input>
  );
}
function PassCodeButton({ onSubmit }: { onSubmit: (e: any) => Promise<void> }) {
  return (
    <button
      type="button"
      className="absolute top-0 right-0 font-semibold rounded-[48px] bg-blueviolet overflow-hidden flex flex-row items-center justify-center  py-5 w-[100px] text-center text-white font-raleway cursor-pointer shadow hover:bg-blue-500"
      onClick={onSubmit}
    >
      Let’s Go
    </button>
  );
}
