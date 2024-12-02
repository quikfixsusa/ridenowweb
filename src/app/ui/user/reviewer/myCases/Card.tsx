'use client';
import IdIcon from '@/app/components/svg/icons/IdIcon';
import UserIcon from '@/app/components/svg/icons/UserIcon';
import { User } from '@/app/lib/definitions';
import Link from 'next/link';

export default function Card({ userData }: { userData: User }) {
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

  function parseUserType(userType: string) {
    if (userType === 'admin') return 'Admin';
    if (userType === 'reviewer') return 'Reviewer';
    if (userType === 'customer') return 'Customer';
    if (userType === 'contractor') return 'Contractor';
    if (userType === 'driver') return 'Driver';
  }

  function getColorByStatus(status: string) {
    if (status === 'approved') return 'bg-green-500 text-white';
    if (status === 'edit') return 'bg-orange-500 text-white';
    if (status === 'inReview') return 'bg-blueQuik text-white';
    if (status === 'reception') return 'bg-yellowQuik text-black';
    return 'bg-gray-400';
  }

  return (
    <div className="flex flex-2 flex-col gap-3 rounded-xl border border-gray-300 p-4 lg:flex-3">
      <div className="flex w-full items-center justify-between gap-2">
        <p className="text-sm font-medium text-gray-600">{parseDate(userData.createdAt)}</p>
        <p className="rounded-sm bg-yellowQuik px-4 text-sm text-black">{parseUserType(userData.userType)}</p>
      </div>
      <div className="flex items-center gap-3">
        {!userData.image && (
          <div className="rounded-full bg-gray-200 p-[13px]">
            <UserIcon size={18} color="gray" />
          </div>
        )}
        {userData.image && (
          <img alt={userData.userName} width={44} height={44} className="h-11 w-11 rounded-full" src={userData.image} />
        )}
        <div>
          <p className="font-semibold">
            {userData.firstName ? `${userData.firstName} ${userData.lastName}` : userData.businessName}
          </p>
          <p className="text-xs text-gray-600">{userData.email}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-medium text-gray-500">Requirements:</p>
        {userData.representative && (
          <div
            className={`flex items-center gap-2 rounded-md ${getColorByStatus(userData.representative.status)} px-3 py-1`}
          >
            <IdIcon size={18} />
            <p className="text-sm">Representative</p>
          </div>
        )}
      </div>
      <div className="flex w-full">
        {userData.requirements.map((requirement, index) => (
          <div
            key={index}
            className={`h-4 ${index === 0 ? 'rounded-l-lg' : ''} ${index === userData.requirements.length - 1 ? 'rounded-r-lg' : ''} w-full border border-white ${getColorByStatus(requirement.status)}`}
          />
        ))}
      </div>
      <hr />
      <Link
        href={`/user/reviewer/mycases/${userData.id}`}
        className="w-full rounded-md bg-blueQuik py-2 text-center font-medium text-white transition-all duration-150 hover:bg-blue-700"
      >
        Verify Requirements
      </Link>
    </div>
  );
}
