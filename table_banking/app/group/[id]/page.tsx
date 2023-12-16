import getAppFromBlockChain, {
  MemberStates,
} from '@/app/service/getAppFromBlockchain';
import GroupBalance from '@/components/group-balance';

export default async function GroupID(props: {
  params: { id: string };
  searchParams: { id: string };
}) {
  return <GroupBalance appID={props.searchParams.id} />
}
