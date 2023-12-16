import { useGroup } from '@/app/group/_context';
import { ellipseAddress } from '@/utils/ellipseAddress';
import type { NextPage } from 'next';

const MemberCardForm: NextPage = () => {
  const { members } = useGroup();
  return (
    <>
      {members && (
        <div className="flex flex-col justify-start gap-2 text-left text-xl text-black font-raleway mt-10">
          <Member
            image="/frame-38@2x.png"
            name={ellipseAddress(members.governor)}
            role="Governor"
          />
          <Line />
          <Member
            image="/frame-591@2x.png"
            name={ellipseAddress(members.memberB.address)}
            role="Member"
          />
          <Line />
          <Member
            image="/frame-59@2x.png"
            name={ellipseAddress(members.memberC.address)}
            role="Member"
          />
          <Line />
          <Member
            image="/frame-592@2x.png"
            name={ellipseAddress(members.memberD.address)}
            role="Member"
          />
        </div>
      )}
    </>
  );
};

export default MemberCardForm;

export function Member({
  image,
  name,
  role,
}: {
  image: string;
  name: string;
  role: string;
}) {
  return (
    <div
      id="Member"
      className="ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none h-[50px]"
    >
      <div className="flex items-center justify-between">
        <img
          className="relative rounded-81xl w-12 h-12 overflow-hidden shrink-0 object-cover shadow"
          alt=""
          src={image}
        />
        <div className="flex items-center">
          <div className="pl-5 text-sm">
            <p className="relative font-inter m-0 font-medium">{name}</p>
            <div className="inline text-gray-500">
              <span className="font-sans">{role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function Line() {
  return (
    <hr className="relative box-border w-full border-t-[1px] border-solid border-lightgray-200" />
  );
}
