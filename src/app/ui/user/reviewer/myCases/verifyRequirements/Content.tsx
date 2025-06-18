import HeaderSectionDashboard from '@/app/components/HeaderSectionDashboard';
import { Review, User } from '@/app/lib/definitions';
import Link from 'next/link';
import React from 'react';

import RequirementsSection from './Requirements';
import RequirementsSectionSkeleton from './RequirementsSkeleton';
import UserCard from './UserCard';

interface Props {
  user: User;
  loadingInProgress: boolean;
  review?: Review;
}

export default function Content({ user, loadingInProgress, review }: Props) {
  return (
    <div className="flex h-full flex-col items-start">
      <HeaderSectionDashboard
        title="Requirements Verification"
        description="Review and verify the requirements submitted by the user"
      />
      <div className="flex w-full items-start gap-8">
        {user && !loadingInProgress && review && (
          <RequirementsSection
            vehicle={review.requirementType === 'vehicle_registration' || review.requirementType === 'insurance'}
            user={user}
            reviewId={review.id}
            requirementId={review.requirementType}
            showCarDetails={review.requirementType === 'vehicle_registration' || review.requirementType === 'insurance'}
          />
        )}
        {loadingInProgress && <RequirementsSectionSkeleton />}
        {!user && !loadingInProgress && (
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <Link
              href="/user/reviewer/mycases"
              className="absolute left-4 top-4 rounded-md bg-blueQuik px-6 py-2 text-white"
            >
              Go back
            </Link>
            <h2 className="text-center text-3xl font-bold">No case found</h2>
            <p className="text-center">The case you are looking for does not exist</p>
          </div>
        )}
        <div className="flex min-w-max items-end py-6 pr-6">
          <UserCard user={user} loadingUser={loadingInProgress} />
        </div>
      </div>
    </div>
  );
}
