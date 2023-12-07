"use client";
import { useWallet } from "@txnlab/use-wallet";
import ConnectWalletButton from "./account/connect-button";
import AccountDropDown from "./account/dropdown";
import Members from "./members";
import { useLocalWallet } from "@/app/_context";
import { usePathname } from "next/navigation";
import { routes } from "@/utils/routes";

export default function RightSideBar() {
  const { activeAddress } = useWallet();
  const { toggleWalletModal } = useLocalWallet();
  const path = usePathname();
  console.log({ path });
  return (
    <div className="pt-8 pr-3 pb-2 grid ">
      <div className="p-3 flex justify-center">
        {activeAddress ? <AccountDropDown /> : <ConnectWalletButton toggleWalletModal={toggleWalletModal} />}
      </div>
      <Members />
    </div>
  );
}
