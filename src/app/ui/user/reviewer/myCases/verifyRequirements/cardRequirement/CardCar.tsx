'use client';
import carImage from '@/app/assets/images/Comfort.png';
import { type Vehicle } from '@/app/lib/definitions';
import Image from 'next/image';

export default function CardCar({ data }: { data: Vehicle }) {
  return (
    <div className="flex items-center gap-8 rounded-lg border border-gray-300 px-6 py-4">
      <Image src={carImage} alt="Car-image" width={200} className="w-20" />
      <div>
        <h3 className="text-2xl font-bold">{data.plate}</h3>
        <p className="text-lg">
          {data.make} • {data.model} • {data.color}
        </p>
      </div>
    </div>
  );
}
