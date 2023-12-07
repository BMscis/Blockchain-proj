import type { NextPage } from 'next';

const MemberCardForm: NextPage = () => {
  return (
    <div className="flex flex-col justify-start gap-2 text-left text-xl text-black font-raleway mt-10">
      <Member image="/frame-38@2x.png" name="Leah" role="Governor" />
      <Line />
      <Member image="/frame-591@2x.png" name="Sandra" role="Member" />
      <Line />
      <Member image="/frame-59@2x.png" name="Winnie" role="Member" />
      <Line />
      <Member image="/frame-592@2x.png" name="Fatuma" role="Member" />
    </div>
  );
};

export default MemberCardForm;

export function Member({ image, name, role }: { image: string; name: string; role: string }) {
  return (
    <div id="Member" className="grid">
      <img className="relative rounded-81xl w-12 h-12 overflow-hidden shrink-0 object-cover shadow" alt="" src={image} />
      <span></span>
      <div className="grid gap-2">
        <div className="relative font-inter font-semibold">{name}</div>
        <hr className="relative box-border w-full border-t-[1px] border-solid border-dashed border-gray shadow" />
        <div className="grid grid-cols-2 gap-2">
          <span className="font-normal text-base font-sans">Role</span>
          <span className="font-normal text-base font-sans">{role}</span>
        </div>
      </div>
    </div>
  );
}
export function Line() {
  return <hr className="relative box-border w-full border-t-[1px] border-solid border-lightgray-200" />;
}
