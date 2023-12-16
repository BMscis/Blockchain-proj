export default function ConnectWalletButton({ toggleWalletModal }: { toggleWalletModal: () => void }) {
  return (
    <div className=" px-8 flex justify-center w-full">
      <button
        className="cursor-pointer [border:none] p-0 bg-green-900 hover:bg-lavenderblush relative rounded-lg w-[150px] h-[50px]"
        id="takeloan"
        onClick={() => {
          toggleWalletModal();
        }}
      >
        <div className=" text-sm font-semibold font-raleway text-white text-center">Connect</div>
      </button>
    </div>
  );
}
