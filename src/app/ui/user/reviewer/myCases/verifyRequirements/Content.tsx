import HeaderSectionDashboard from '@/app/components/HeaderSectionDashboard';
import { DriverRequirementReview } from '@/app/lib/types/reviewsTypes';
import { IDriverUser } from '@/app/lib/types/userTypes';
import Link from 'next/link';
import React from 'react';

import RequirementsSection from './Requirements';
import RequirementsSectionSkeleton from './RequirementsSkeleton';
import UserCard from './UserCard';

interface Props {
  driver: IDriverUser;
  loadingInProgress: boolean;
  review?: DriverRequirementReview;
}

export default function Content({ driver, loadingInProgress, review }: Props) {
  return (
    <div className="flex h-full flex-col items-start">
      <HeaderSectionDashboard
        title="Requirements Verification"
        description="Review and verify the requirements submitted by the user"
      />
      <div className="flex w-full items-start gap-8">
        {driver && !loadingInProgress && review && (
          <RequirementsSection
            vehicle={
              review.requirement_type === 'vehicle_registration' ||
              review.requirement_type === 'insurance' ||
              review.requirement_type === 'vehicle_title' ||
              review.requirement_type === 'rcv_insurance' ||
              review.requirement_type === 'circulation_permit'
            }
            driver={driver}
            reviewId={review.id}
            requirementId={review.requirement_type}
            showCarDetails={
              review.requirement_type === 'vehicle_registration' ||
              review.requirement_type === 'insurance' ||
              review.requirement_type === 'vehicle_title' ||
              review.requirement_type === 'rcv_insurance' ||
              review.requirement_type === 'circulation_permit'
            }
          />
        )}
        {loadingInProgress && <RequirementsSectionSkeleton />}
        {!driver && !loadingInProgress && (
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <Link
              href="/user/reviewer/mycases"
              className="absolute left-4 top-4 rounded-md bg-blueQuik px-6 py-2 text-white"
            >
              Ir Atras
            </Link>
            <h2 className="text-center text-3xl font-bold">No se encontraron casos</h2>
            <p className="text-center">El caso que estas buscando no existe</p>
          </div>
        )}
        <div className="flex min-w-max items-end py-6 pr-6">
          <UserCard driver={driver} loadingUser={loadingInProgress} />
        </div>
      </div>
    </div>
  );
}
