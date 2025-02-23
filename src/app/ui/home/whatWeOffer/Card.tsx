import Image from 'next/image';

import { type Card } from './cardsInfo';

export default function Card({ image, title, description }: Card) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-gray-300 bg-gray-100 px-4 py-4 transition-all duration-150 hover:scale-[1.03] hover:shadow-2xl">
      <Image quality={100} src={image} alt="card image" sizes="500px" className="w-full rounded-xl object-contain" />
      <div className="flex flex-col gap-1">
        <p className="text-xl font-bold md:text-2xl">{title}</p>
        <p className="text-sm text-gray-600 md:text-base">{description}</p>
      </div>
    </div>
  );
}
