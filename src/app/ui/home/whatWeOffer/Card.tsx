import Image from 'next/image';

import { type Card } from './cardsInfo';

export default function Card({ image, title, description }: Card) {
  return (
    <div className="w-full rounded-2xl bg-yellowQuik transition-all duration-150 hover:scale-105">
      <Image quality={100} src={image} alt="card image" sizes="500px" className="w-full rounded-2xl object-contain" />
      <div className="px-4 py-3">
        <p className="text-base font-bold md:text-lg">{title}</p>
        <p className="text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
}
