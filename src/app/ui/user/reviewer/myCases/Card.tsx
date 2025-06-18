'use client';
import UserIcon from '@/app/components/svg/icons/UserIcon';
import { Review } from '@/app/lib/definitions';
import Link from 'next/link';

export default function Card({ reviewData }: { reviewData: Review }) {
  function parseDate({ seconds, nanoseconds }: { seconds: number; nanoseconds: number }) {
    // Convierte seconds a milisegundos y nanoseconds a milisegundos
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;

    // Crea un objeto Date con los milisegundos
    const date = new Date(milliseconds);

    // Formatea la fecha en texto en inglés
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="flex flex-2 flex-col gap-3 rounded-xl border border-gray-300 p-4 lg:flex-3">
      <div className="flex w-full items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-600">{parseDate(reviewData.createdAt)}</p>
        <p className="rounded-sm bg-yellowQuik px-4 text-sm text-black">{reviewData.titleRequirement}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-gray-200 p-[13px]">
          <UserIcon size={18} color="gray" />
        </div>
        <div>
          <p className="font-semibold">{reviewData.driverName}</p>
          <p className="text-xs text-gray-600">{reviewData.driverId}</p>
        </div>
      </div>
      <hr />
      {reviewData.status !== 'completed' && (
        <Link
          href={`/user/reviewer/mycases/${reviewData.id}`}
          className="w-full rounded-md bg-blueQuik py-2 text-center font-medium text-white transition-all duration-150 hover:bg-blue-700"
        >
          Verify Requirement
        </Link>
      )}
      {reviewData.status === 'completed' && (
        <div className="w-full rounded-md bg-green-600 py-2 text-center font-medium text-white">Completed</div>
      )}
    </div>
  );
}
