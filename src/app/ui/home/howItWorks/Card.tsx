import Image, { type StaticImageData } from 'next/image';

export interface CardProps {
  title: string;
  step: number;
  description: string;
  image: StaticImageData;
}

export default function Card({ title, description, image, step }: CardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-2xl bg-neutral-900 p-6 md:p-8">
      <div>
        <span className="rounded-full bg-yellowQuik px-6 py-1 text-sm font-medium text-black md:text-lg">
          Step {step}
        </span>
        <h4 className="mt-4 text-3xl font-bold text-white">{title}</h4>
        <p className="text-sm text-white">{description}</p>
      </div>
      <div className="">
        <Image src={image} alt="searh service" width={450} height={900} className="w-48 object-contain" />
      </div>
    </div>
  );
}
