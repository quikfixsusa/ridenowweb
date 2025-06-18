import { useReviewerContext } from '@/app/lib/context/ReviewerContext';

import ReviewCard from './ReviewCard';
import UserSkeletonCard from './UserSkeletonCard';

interface CasesProps {
  reviewsData: any;
  loading: boolean;
}

export default function Cards({ reviewsData, loading }: CasesProps) {
  const { user, loadingUser } = useReviewerContext();
  const loadSkeleton = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex w-full flex-wrap gap-4">
      {!loading && reviewsData.length === 0 && <p className="text-center font-medium">No requests available</p>}
      {loading && loadSkeleton.map((item) => <UserSkeletonCard key={item} />)}
      {!loadingUser &&
        user &&
        reviewsData.length > 0 &&
        reviewsData.map((review: any) => <ReviewCard key={user.id} reviewData={review} />)}
    </div>
  );
}
