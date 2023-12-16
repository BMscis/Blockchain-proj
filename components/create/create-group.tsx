'use client';
import { useWallet } from '@txnlab/use-wallet';
import { useSnackbar } from 'notistack';
import { useCreate } from './_context';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes';
import { createNewGroup } from '@/utils/client';
export default function CreateGroup() {
  const { enqueueSnackbar } = useSnackbar();
  const { signer, activeAddress } = useWallet();
  const { setGroup } = useCreate();
  const router = useRouter();
  const onSubmit = async (e: any) => {
    if (!activeAddress) {
      enqueueSnackbar('Please connect wallet first', {
        variant: 'warning',
      });
      return false;
    }
    const transactionSigner = { addr: activeAddress, signer };
    const response = await createNewGroup({
      transactionSigner,
      snack: enqueueSnackbar,
    });
    setGroup(response);
    router.push(routes.add);
  };
  return <GroupForm onSubmit={onSubmit} />;
}

function GroupForm({
  onSubmit,
}: {
  onSubmit: (e: any) => Promise<false | undefined>;
}) {
  return (
    <div
      id="CreateGroup"
      className="relative bg-lavenderblush mx-36 text-left text-midnightblue font-raleway rounded-3xl"
    >
      <div className="m-auto rounded-3xl bg-white shadow-[13px_13px_54.5px_rgba(212,_70,_155,_0.22)] p-5 ">
        <b className=" text-[24px] tracking-[-0.01em] leading-[130%]">
          Create a group
        </b>
        <div className="flex flex-col items-start justify-start gap-[10px] w-full mt-4">
          <GroupInput label="Group Name" />
          <GroupInput label="Minimum monthly savings" />
          <GroupInput label="Maximum monthly savings" />
          <GroupInput label="Set a loan interest rate" />
          {/* <GroupInput label=""/> */}
          <GroupInput label="Fix a savings period" />

          {/* <div className="flex flex-col items-start justify-start gap-[16px]">
        <div className="relative tracking-[-0.01em] leading-[130%]">
          Set a loan interest rate
        </div>
        <div className="relative rounded-md box-border w-[523px] h-[68px] overflow-hidden shrink-0 border-[1px] border-solid border-midnightblue">
          <div className="absolute top-[21px] left-[486.75px] tracking-[-0.01em] leading-[130%]">
            %
          </div>
        </div>
      </div> */}
        </div>
        <button
          type="button"
          className="cursor-pointer mt-5 inline-flex justify-center rounded-md border border-transparent bg-blueviolet px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={onSubmit}
        >
          Create group
        </button>
      </div>
    </div>
  );
}
export function GroupInput({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <label className="relative tracking-[-0.01em] leading-[130%] mb-5">
        {label}
      </label>
      <input
        type="text"
        placeholder={label}
        className="relative w-full h-10 rounded box-border shrink-0 border-[1px] border-solid border-midnightblue"
      />
    </div>
  );
}
