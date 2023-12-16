import { routes } from '@/utils/routes';
import { useWallet } from '@txnlab/use-wallet';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useCreate } from '../create/_context';
import { addMembers } from '@/utils/client';

export default function AddMembers() {
  const { enqueueSnackbar } = useSnackbar();
  const { signer, activeAddress } = useWallet();
  const { group } = useCreate();
  const router = useRouter();
  const onSubmit = async (e: any) => {
    if (!activeAddress) {
      enqueueSnackbar('Please connect wallet first', {
        variant: 'warning',
      });
      return false;
    }
    if (!group) {
      enqueueSnackbar('Missing active app', {
        variant: 'warning',
      });
      return false;
    }
    const transactionSigner = { addr: activeAddress, signer };
    const response = await addMembers({
      members: [
        'ZZRBBNIEN6IHZNYN2455O36X2ZSQEJF6P5UCJAEZ53UCP5R4NW57DRTZT4',
        'SJQAHBFSNUDR2JCVPGBXPSBK2F2ZZ4VTDSJ3HE2L7O4HN46WD6KQFNGX3A',
        'I2TF77O4NO67W6XD3V7D2NYK3YS7T3GCVS7RG3RHPBGY7PSZZM24URAQDA',
        'OZUUPC2B6SKD4MHNFOHZAWOBCRGBBWH7QWZJ4GREGAM7Q43RBYNO6ILW5Q',
      ],
      appID: parseInt(group.appId),
      transactionSigner,
      snack: enqueueSnackbar,
    });
    router.push(`${routes.groupID}?id=${group.appId}`);
  };
  return (
    <div
      id="CreateGroup"
      className="relative bg-lavenderblush mx-36 text-left text-midnightblue font-raleway rounded-3xl"
    >
      <div className="m-auto rounded-3xl bg-white shadow-[13px_13px_54.5px_rgba(212,_70,_155,_0.22)] p-5 ">
        <b className=" text-[24px] tracking-[-0.01em] leading-[130%]">
          Add Members
        </b>
        <div className="flex flex-col items-start justify-start gap-[10px] w-full mt-4">
          <MembersInput label="New Member" />
          <MembersInput label="New Member" />
          <MembersInput label="New Member" />
          <MembersInput label="New Member" />
        </div>
        <button
          type="button"
          className="cursor-pointer mt-5 inline-flex justify-center rounded-md border border-transparent bg-blueviolet px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={onSubmit}
        >
          Add Members
        </button>
      </div>
    </div>
  );
}

export function MembersInput({ label }: { label: string }) {
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
