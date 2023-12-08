import getAppFromBlockChain, {
  MemberStates,
} from '@/app/service/getAppFromBlockchain';
import GroupBalance from '@/components/group-balance';

export default async function GroupID(props: {
  params: { id: string };
  searchParams: { id: string };
}) {
  console.log({ props });
  try {
    const members: MemberStates = JSON.parse(
      await getAppFromBlockChain(parseInt(props.searchParams.id))
    );
    return <GroupBalance state={members} appID={props.searchParams.id} />;
  } catch (error) {
    console.log(error);
    return null;
  }
}
