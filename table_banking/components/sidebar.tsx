export default function SideBar() {
  return (
    <aside id="sidebar" className="bg-white box-border border-[1px] border-solid border-lightgray-200">
      <div className="absolute top-[120px] left-[31.38px] flex flex-col items-start justify-start gap-[38px] text-base">
        <div className="flex flex-row items-center justify-start gap-[20px]">
          <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/home.svg" />
          <div className="relative">Home</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-[20px]">
          <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/activity.svg" />
          <div className="relative">Transaction History</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-[20px]">
          <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/dollarsign.svg" />
          <div className="relative">Wallet</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-[20px]">
          <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/userplus.svg" />
          <div className="relative">Invite Members</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-[20px]">
          <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/rss.svg" />
          <div className="relative">Community</div>
        </div>
      </div>
      <img className="absolute top-[39px] left-[33.38px] w-[31.38px] h-[26.61px]" alt="" src="/frame-67.svg" />
      <div className="absolute top-[938.01px] left-[36.88px] text-gray">Disclaimer</div>
      <div className="absolute top-[901.23px] left-[36.88px] text-gray">Report</div>
    </aside>
  );
}
