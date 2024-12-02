import Image from 'next/image';

import { type CardsProps } from './cardsInfo';

export default function Card({ name, review, image }: CardsProps) {
  return (
    <div className="relative flex w-full flex-col gap-14 rounded-2xl bg-blueQuik px-5 py-8 md:px-8">
      <Image
        src={image}
        alt="User 1"
        width={400}
        height={400}
        className="absolute left-[50%] top-[-40px] mb-4 h-24 w-24 translate-x-[-50%] rounded-full border-[6px] border-blueQuik"
      />
      <p className="mt-8 text-base text-white md:text-lg">{review}</p>
      <div>
        <p className="mt-4 text-4xl font-semibold text-white md:text-5xl">{name}</p>
        <p className="text-sm text-white">Customer</p>
      </div>
    </div>
  );
}
