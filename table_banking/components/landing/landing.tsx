'use client';
import { routes } from '@/utils/routes';
import { useRouter } from 'next/navigation';

export default function Landing() {
  return (
    <div className="relative bg-snow w-full h-full overflow-hidden text-center text-[29.39px] text-midnightblue font-raleway grid grid-cols-2 rounded-md">
      <GroupButton image="new-group.png" text={'Create New Group'} route={routes.create} />
      <GroupButton image="existing-group.png" text="Join existing group" route={routes.join} />
    </div>
  );
}

export function GroupButton({ image, text, route }: { image: string; text: string; route: string }) {
  const router = useRouter();
  return (
    <button
      className="hover:bg-lavenderblush grid grid-rows-2 cursor-pointer rounded-xl bg-white shadow-[10px_12px_37.7px_rgba(254,_118,_199,_0.35)] box-border w-[343px] h-[343px] overflow-hidden border-[2px] border-solid border-mediumvioletred"
      onClick={() => {
        router.push(route);
      }}
    >
      <img className="m-auto  w-[90px] h-[90px] object-cover" alt="" src={image} />
      <b className="">{text}</b>
    </button>
  );
}
