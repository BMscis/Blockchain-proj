import { usePathname } from 'next/navigation';
import MemberCardForm from './member-card-form';
import { routes } from '@/utils/routes';

export default function Members({}) {
  const path = usePathname();
  return (
    <section
      id="Members"
      className={`${
        path === routes.group ? '' : 'invisible'
      } p-3 rounded-3xl bg-white box-border text-left text-9xl text-mediumvioletred font-raleway border-[1px] border-solid border-lightgray-200`}
    >
      <b className="">Members</b>
      <MemberCardForm />
    </section>
  );
}
