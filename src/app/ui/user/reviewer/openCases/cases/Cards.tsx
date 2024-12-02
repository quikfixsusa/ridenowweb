import { useReviewerContext } from '@/app/lib/context/ReviewerContext';

import UserCard from './UserCard';
import UserSkeletonCard from './UserSkeletonCard';

interface CasesProps {
  usersData: any;
  loading: boolean;
}

export default function Cards({ usersData, loading }: CasesProps) {
  const { user, loadingUser } = useReviewerContext();
  const loadSkeleton = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex w-full flex-wrap gap-4">
      {!loading && usersData.length === 0 && <p className="text-center font-medium">No requests available</p>}
      {loading && loadSkeleton.map((item) => <UserSkeletonCard key={item} />)}
      {!loadingUser &&
        user &&
        usersData.length > 0 &&
        usersData.map((user: any) => <UserCard key={user.id} userData={user} />)}
    </div>
  );
}
