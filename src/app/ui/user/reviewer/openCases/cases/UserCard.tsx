import UserIcon from '@/app/components/svg/icons/UserIcon';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { db } from '@/app/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function UserCard({ userData }: { userData: any }) {
  const { user } = useReviewerContext();
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

  async function acceptRequest() {
    if (!user) return;
    await updateDoc(doc(db, 'users', userData.id), { reviewer: user.id });
  }

  function toastiNoty() {
    toast.promise(
      acceptRequest,
      {
        pending: 'Accepting request',
        success: 'Request accepted',
        error: 'Error accepting request',
      },
      {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        closeButton: true,
      },
    );
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
      <hr />
      <button
        onClick={toastiNoty}
        className="w-full rounded-md bg-blueQuik py-2 font-medium text-white transition-all duration-150 hover:bg-blue-700"
      >
        Accept
      </button>
    </div>
  );
}
