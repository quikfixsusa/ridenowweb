import AngleRightIcon from '@/app/components/svg/icons/AngleRightIcon';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { DriverRequirementReview } from '@/app/lib/types/reviewsTypes';
import Link from 'next/link';

import Cards from '../myCases/Cards';

export default function InReviewCases() {
  const { inProgressReviews } = useReviewerContext();

  function sortByCreatedAt(arr: DriverRequirementReview[]) {
    return arr.sort((a, b) => {
      const dateA = a.created_at.seconds * 1000 + a.created_at.nanoseconds / 1000000;
      const dateB = b.created_at.seconds * 1000 + b.created_at.nanoseconds / 1000000;

      return dateA - dateB;
    });
  }

  const getUsersWithRequirementsInReview = () => {
    const reviewsPending = inProgressReviews.filter((review) => review.status !== 'completed');
    return sortByCreatedAt(reviewsPending).slice(0, 2);
  };
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-5">
        <h2 className="text-2xl font-bold">In Review Cases</h2>
        <Link
          className="flex items-center gap-1 text-blue-600 transition-all duration-100 hover:underline"
          href="/user/reviewer/mycases"
        >
          <p>See all</p>
          <AngleRightIcon size={12} />
        </Link>
      </div>
      <Cards reviews={getUsersWithRequirementsInReview()} home={true} />
    </div>
  );
}
