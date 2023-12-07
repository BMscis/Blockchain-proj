export default function Header() {
  return (
    <div id="WelcomeHeader" className="m-8 flex flex-row items-start justify-start text-[48px]">
      <h1 className="m-0 relative text-inherit font-inherit font-sans font-thin">
        <span>{`Welcome `}</span>
        {/* <b>Jane Ashley!</b> */}
      </h1>
    </div>
  );
}

// export function ConnectWallet() {
//   <div className="flex flex-row items-center justify-start gap-[9px] text-[28.38px] font-inter">
//     <div className="flex flex-row items-center justify-start gap-[16px]">
//       <div className="relative">Jane</div>
//       <img
//         className="relative rounded-81xl w-12 h-12 overflow-hidden shrink-0 object-cover"
//         alt=""
//         src="/frame-38@2x.png"
//       />
//     </div>
//     <button
//       className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-6 h-6 overflow-hidden shrink-0"
//       id="dropdown"
//     >
//       <img
//         className="absolute h-[33.33%] w-[58.33%] top-[33.33%] right-[20.83%] bottom-[33.33%] left-[20.83%] max-w-full overflow-hidden max-h-full"
//         alt=""
//         src="/vector.svg"
//       />
//     </button>
//   </div>;
// }
