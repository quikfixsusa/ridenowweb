import UserIcon from '@/app/components/svg/icons/UserIcon';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { db } from '@/app/lib/firebase';
import { DriverRequirementReview } from '@/app/lib/types/reviewsTypes';
import { IDriverUser } from '@/app/lib/types/userTypes';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ReviewCard({ reviewData }: { reviewData: DriverRequirementReview }) {
  const { user } = useReviewerContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  async function acceptRequest() {
    setError('');
    if (!user) return;
    setLoading(true);
    try {
      const driverRef = doc(db, 'users', reviewData.driver_id);
      const driverData = (await getDoc(driverRef)).data() as IDriverUser;
      if (!driverData) {
        setError('Driver not found');
        return;
      }
      const driverRequirements = driverData.requirements;
      const vehicleRequirements = driverData.vehicle_requirements;
      const insurance = driverData.insurance;

      if (reviewData.requirement_type === 'insurance' && insurance) {
        insurance.status = 'in_review';
      }
      if (reviewData.requirement_type === 'insurance_proof' && insurance) {
        insurance.monthly_checks[0].status = 'in_review';
      }

      driverRequirements.map((requirement) => {
        if (requirement.id === reviewData.requirement_type) {
          requirement.status = 'in_review';
        }
      });

      vehicleRequirements.map((requirement) => {
        if (requirement.id === reviewData.requirement_type) {
          requirement.status = 'in_review';
        }
      });

      await updateDoc(doc(db, 'reviews', reviewData.id), {
        reviewer_id: user.id,
        taken_at: new Date(),
        status: 'accepted',
      });
      await updateDoc(doc(db, 'users', reviewData.driver_id), {
        requirements: driverRequirements,
        vehicle_requirements: vehicleRequirements,
        insurance,
      });
      setLoading(false);
    } catch (error) {
      setError('Error accepting request');
      setLoading(false);
    }
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
        <p className="text-sm font-medium text-gray-600">{parseDate(reviewData.created_at)}</p>
        <p className="rounded-sm bg-yellowQuik px-4 text-sm text-black">{reviewData.title_requirement}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-gray-200 p-[13px]">
          <UserIcon size={18} color="gray" />
        </div>
        <div>
          <p className="font-semibold">{reviewData.driver_name}</p>
          <p className="text-xs text-gray-600">{reviewData.driver_id}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        <button
          onClick={toastiNoty}
          disabled={loading}
          className="w-full rounded-md bg-blueQuik py-2 font-medium text-white transition-all duration-150 hover:bg-blue-700 disabled:opacity-75"
        >
          {loading ? 'Aceptando...' : 'Aceptar'}
        </button>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
