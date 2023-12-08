'use client';
import {
  MemberBalance,
  MemberStates,
} from '@/app/service/getAppFromBlockchain';
import TableBanking from './table-banking';
import { useWallet } from '@txnlab/use-wallet';
import { useRouter } from 'next/navigation';
import { useGroup } from '@/app/group/_context';
import { useEffect, useState } from 'react';
const loanLimitMultiplier = 3;

function getMemberByAddress(
  memberStates: MemberStates,
  targetAddress: string
): MemberBalance | null {
  // Find the member whose address matches the targetAddress
  const memberKeys = Object.keys(memberStates).slice(
    1
  ) as (keyof MemberStates)[]; // Exclude governor

  for (const key of memberKeys) {
    const member = memberStates[key] as MemberBalance;
    if (member.address === targetAddress) {
      return member;
    }
  }

  // Return null if no member is found with the given address
  return null;
}
function calculateTotalSavings(memberStates: MemberStates): number {
  const memberBalances = Object.values(memberStates).slice(1); // Exclude governor
  const totalSavings = memberBalances.reduce(
    (total, member) => total + member.savings,
    0
  );
  return totalSavings / 1000000;
}

function calculateTotalLoans(memberStates: MemberStates): number {
  const memberBalances = Object.values(memberStates).slice(1); // Exclude governor
  const totalLoans = memberBalances.reduce(
    (total, member) => total + member.loans,
    0
  );
  return totalLoans;
}
function calculateUserLoan(
  memberStates: MemberStates,
  targetAddress: string
): number {
  const member = getMemberByAddress(memberStates, targetAddress);
  if (!member) return 0;

  return member.loans === 0 ? 0 : member.loans / 1000000;
}
function calculateUserSavings(memberState: MemberStates, address: string) {
  const member = getMemberByAddress(memberState, address);
  if (!member) return 0;
  return member.savings;
}
function calculateLoanLimit(
  memberState: MemberStates,
  address: string,
  totalSavings: number
) {
  const member = getMemberByAddress(memberState, address);
  if (!member) return 0;
  const { savings: userSavingsContribution } = member;
  // Calculate the user's loan limit based on the formula
  const loanLimit =
    totalSavings * loanLimitMultiplier - userSavingsContribution;

  // Ensure the loan limit is non-negative
  if (loanLimit === 0) return 0;
  return Math.max(0, loanLimit / 1000000);
}
export default function GroupBalance({
  state,
  appID,
}: {
  state: MemberStates;
  appID: string;
}) {
  const [totalGroupSavings, setTotalGroupSavings] = useState(0);
  const [loanLimit, setLoanLimit] = useState(0);
  const [loanDue, setLoanDue] = useState(0);
  const [userSavings, setUserSavings] = useState(0);
  const { activeAddress } = useWallet();
  const { setMembers, setAppID } = useGroup();
  const router = useRouter();
  useEffect(() => {
    if (!activeAddress) return;
    setMembers(state);
    setAppID(parseInt(appID));
    setTotalGroupSavings(calculateTotalSavings(state));
    setLoanDue(calculateUserLoan(state, activeAddress));
    setUserSavings(calculateUserSavings(state, activeAddress));
    setLoanLimit(calculateLoanLimit(state, activeAddress, totalGroupSavings));
  }, [activeAddress]);
  return (
    <div
      id="GroupBalance"
      className=" rounded-lg bg-lavenderblush  "
      // className="ml-8 rounded-[23.61px] bg-lavenderblush w-[875.02px] h-[332.19px] "
    >
      <div className="grid grid-cols-2 gap-4 max-w-full p-5 bg-lavenderblush">
        <div className="grid grid-cols-[30% 70%] gap-[8px] bg-lavenderDark rounded-lg p-4">
          <div className="relative font-mono font-bold text-slate-800">
            Total Group Savings
          </div>
          <input
            className="[border:none] font-mono bg-[transparent] relative text-black text-left text-[32px]"
            name="TotalSavings"
            id="TotalSavings"
            value={`$${totalGroupSavings}`}
            type="text"
            readOnly
          />
          <div className="mt-3 flex flex-row items-start justify-start">
            <div className="relative font-mono font-bold text-slate-800">
              {'Loan Limit: '}
              <span className="text-red">${loanLimit}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-4 items-start justify-start gap-[10px] bg-lavenderDark rounded-lg p-4">
          <div className="flex flex-col items-start justify-start gap-[8px]">
            <div className="relative font-mono font-bold text-slate-800">
              Your Total savings
            </div>
            <input
              className="[border:none] font-mono text-mid-8 bg-[transparent] relative text-green text-left inline-block w-[214px]"
              name="totalSavings"
              id="totalSavings"
              value={`$${totalGroupSavings}`}
              type="text"
              readOnly
            />
          </div>
          <div className="mt-3 flex flex-row items-start justify-start">
            <div className="relative font-mono font-bold text-slate-800">
              {'Loan Due: '}
              <span className="text-red">${loanDue}</span>
            </div>
          </div>
        </div>
      </div>
      <TableBanking />
    </div>
  );
}
