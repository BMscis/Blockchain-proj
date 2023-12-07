'use client';
import TableBanking from './table-banking';

export default function GroupBalance() {
  return (
    <div
      id="GroupBalance"
      className=" rounded-lg bg-lavenderblush  "
      // className="ml-8 rounded-[23.61px] bg-lavenderblush w-[875.02px] h-[332.19px] "
    >
      <div className="grid grid-cols-2 gap-4 max-w-full p-5 bg-lavenderblush">
        <div className="grid grid-cols-[30% 70%] gap-[8px] bg-lavenderDark rounded-lg p-4">
          <div className="relative font-mono font-bold text-slate-800">Total Group Savings</div>
          <input
            className="[border:none] font-mono bg-[transparent] relative text-black text-left text-[32px]"
            name="TotalSavings"
            id="TotalSavings"
            value="$450,000"
            type="text"
            readOnly
          />
        </div>
        <div className="grid grid-rows-2 gap-4 items-start justify-start gap-[10px] bg-lavenderDark rounded-lg p-4">
          <div className="flex flex-col items-start justify-start gap-[8px]">
            <div className="relative font-mono font-bold text-slate-800">Your Total savings</div>
            <input
              className="[border:none] font-mono text-mid-8 bg-[transparent] relative text-green text-left inline-block w-[214px]"
              name="totalSavings"
              id="totalSavings"
              value="$5,000"
              type="text"
              readOnly
            />
          </div>
          <div className="mt-3 flex flex-row items-start justify-start">
            <div className="relative font-mono font-bold text-slate-800">
              {'Loan Due: '}
              <span className="text-red">$500</span>
            </div>
          </div>
        </div>
      </div>
      <TableBanking />
    </div>
  );
}
