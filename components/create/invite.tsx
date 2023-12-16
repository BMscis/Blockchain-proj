import { routes } from '@/utils/routes';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

export default function Invite({ code }: { code: string }) {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
                <Dialog.Panel className="bg-white max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all font-raleway">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Passcode to invite members
                  </Dialog.Title>
                  <div className="text-center text-[47.4px] tracking-[-0.01em] leading-[150%] font-medium font-inter text-black">
                    {code}
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <ShareButton
                      text="copy"
                      copy={true}
                      route={code}
                      color="bg-mediumvioletred"
                    />
                    <ShareButton
                      text="Go to dashboard"
                      copy={false}
                      route={routes.group}
                      color="bg-blueviolet"
                    />
                  </div>
                  <div className="absolute top-[475.85px] left-[838.96px] flex flex-row items-center justify-start gap-[11px] font-inter">
                    <div className="relative tracking-[-0.01em] leading-[150%] font-medium">
                      copy
                    </div>
                    <CopyIcon className="relative w-10 h-10 object-cover" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function ShareCode({ code }: { code: string }) {
  return (
    <Dialog.Panel className="max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all font-raleway">
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Passcode to invite members
      </Dialog.Title>
      <div className="text-[47.4px] tracking-[-0.01em] leading-[150%] font-medium font-inter text-black">
        EJD6574
      </div>
      <div className="grid grid-cols-2">
        <ShareButton text="copy" copy={true} route={code} color="" />
        <ShareButton
          text="Go to dashboard"
          copy={false}
          route={routes.group}
          color=""
        />
      </div>
      <div className="absolute top-[475.85px] left-[838.96px] flex flex-row items-center justify-start gap-[11px] font-inter">
        <div className="relative tracking-[-0.01em] leading-[150%] font-medium">
          copy
        </div>
        <CopyIcon className="relative w-10 h-10 object-cover" />
      </div>
    </Dialog.Panel>
  );
}

function CopyIcon(props: any) {
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
        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
      />
    </svg>
  );
}

function ShareButton({
  text,
  copy,
  route,
  color,
}: {
  text: string;
  copy: boolean;
  route: string;
  color: string;
}) {
  const router = useRouter();
  return (
    <button
      className={`m-auto rounded-lg  w-[137px] h-[60px] overflow-hidden flex flex-row items-center justify-center cursor-pointer text-white ${color}`}
      onClick={() => {
        if (copy) {
          navigator.clipboard.writeText(route);
        } else {
          router.push(route);
        }
      }}
    >
      <span className="relative tracking-[-0.01em] leading-[150%] font-medium">
        {text}
      </span>
    </button>
  );
}
