import type { NextPage } from 'next';

export function Activity() {
  return (
    <section className="absolute top-[512px] left-[277.47px] rounded-3xl bg-white box-border w-[875.02px] h-[534.49px] text-left text-9xl text-mediumvioletred font-raleway border-[1px] border-solid border-lightgray-200">
      <b className="absolute top-[39.1px] left-[56.53px]">Activity</b>
      <SavingsSection />
    </section>
  );
}
const SavingsSection: NextPage = () => {
  return (
    <section className="absolute top-[109px] left-[56.53px] flex flex-col items-start justify-start gap-[26px] text-left text-xl text-black font-raleway">
      <div className="relative box-border w-[754.72px] h-px border-t-[1px] border-solid border-lightgray-200" />
      <div className="relative">Leah saved $2000</div>
      <div className="relative box-border w-[754.72px] h-px border-t-[1px] border-solid border-lightgray-200" />
      <div className="relative">Sandra paid back a loan of $800 + $8</div>
      <div className="relative box-border w-[754.72px] h-px border-t-[1px] border-solid border-lightgray-200" />
      <div className="relative">
        <span>{`Sandra paid back a loan of `}</span>
        <b className="text-limegreen">$808</b>
      </div>
      <div className="relative box-border w-[754.72px] h-px border-t-[1px] border-solid border-lightgray-200" />
      <div className="relative">Sandra paid back a loan of $800 + $8</div>
      <div className="relative box-border w-[754.72px] h-px border-t-[1px] border-solid border-lightgray-200" />
      <div className="relative">Sandra paid back a loan of $800 + $8</div>
      <div className="relative box-border w-[754.72px] h-px border-t-[1px] border-solid border-lightgray-200" />
      <div className="relative">Sandra paid back a loan of $800 + $8</div>
    </section>
  );
};

export default SavingsSection;
