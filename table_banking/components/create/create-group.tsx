"use client";
export default function CreateGroup() {
  return (
    <div id="CreateGroup" className="relative bg-lavenderblush mx-36 text-left text-midnightblue font-raleway rounded-3xl">
      <div className="m-auto rounded-3xl bg-white shadow-[13px_13px_54.5px_rgba(212,_70,_155,_0.22)] p-5 ">
        <b className=" text-[24px] tracking-[-0.01em] leading-[130%]">Create a group</b>
        <div className="flex flex-col items-start justify-start gap-[10px] w-full mt-4">
          <GroupInput label="Group Name" />
          <GroupInput label="Minimum monthly savings" />
          <GroupInput label="Maximum monthly savings" />
          <GroupInput label="Set a loan interest rate" />
          {/* <GroupInput label=""/> */}
          <GroupInput label="Fix a savings period" />

          {/* <div className="flex flex-col items-start justify-start gap-[16px]">
            <div className="relative tracking-[-0.01em] leading-[130%]">
              Set a loan interest rate
            </div>
            <div className="relative rounded-md box-border w-[523px] h-[68px] overflow-hidden shrink-0 border-[1px] border-solid border-midnightblue">
              <div className="absolute top-[21px] left-[486.75px] tracking-[-0.01em] leading-[130%]">
                %
              </div>
            </div>
          </div> */}
        </div>
        <div className="rounded-lg bg-button-color flex flex-row items-center justify-center p-2.5 box-border text-white w-36 mt-5 ">
          <button className="relative  font-semibold">Create group</button>
        </div>
      </div>
    </div>
  );
}

export function GroupInput({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <label className="relative tracking-[-0.01em] leading-[130%] mb-5">{label}</label>
      <input
        type="text"
        placeholder={label}
        className="relative w-full h-10 rounded box-border shrink-0 border-[1px] border-solid border-midnightblue"
      />
    </div>
  );
}
