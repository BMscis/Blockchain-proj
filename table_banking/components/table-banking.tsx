export default function TableBanking() {
  return (
    <div className="p-8">
      <div className=" box-border w-[714.29px] h-px border-t-[1px] border-soli border-slate-600 " />
      <div className=" grid grid-cols-3 gap-8">
        <button className="cursor-pointer [border:none] p-0 bg-button-color hover:bg-purple-900 relative rounded-lg px-10 py-2" id="save">
          <div className=" text-xl font-semibold font-raleway text-white text-center">Save</div>
        </button>
        <button
          className="cursor-pointer [border:none] p-0 bg-mediumvioletred hover:bg-pink-600 relative rounded-lg px-10 py-2"
          id="takeloan"
        >
          <div className=" text-xl font-semibold font-raleway text-white text-center">Take a Loan</div>
        </button>
        <button className="cursor-pointer [border:none] p-0 bg-black hover:bg-gray relative rounded-lg px-10 py-2" id="payloan">
          <div className="text-xl font-semibold font-raleway text-white text-center">Pay Loan</div>
        </button>
      </div>
    </div>
  );
}
