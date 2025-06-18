'use client';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { Review } from '@/app/lib/definitions';

import Card from './Card';
import CardSkeleton from './CardSkeleton';

export default function Cards({ reviews, home }: { reviews: Review[]; home?: boolean }) {
  const { loadingInProgress } = useReviewerContext();
  const loadingSkeleton = home ? [1, 2, 3] : [1, 2, 3, 4, 5, 6];
  return (
    <div className={`flex w-full flex-wrap gap-4 ${home ? '' : 'px-8 py-4'}`}>
      {reviews && reviews.length === 0 && !loadingInProgress && <h2 className="text-center font-medium">No cases</h2>}
      {reviews &&
        reviews.length > 0 &&
        !loadingInProgress &&
        reviews.map((review) => <Card key={review.id} reviewData={review} />)}
      {loadingInProgress && loadingSkeleton.map((item) => <CardSkeleton key={item} />)}
    </div>
  );
}
