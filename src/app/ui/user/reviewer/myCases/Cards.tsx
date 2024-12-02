'use client';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { User } from '@/app/lib/definitions';

import Card from './Card';
import CardSkeleton from './CardSkeleton';

export default function Cards({ users, home }: { users: User[]; home?: boolean }) {
  const { loadingInProgress } = useReviewerContext();
  const loadingSkeleton = home ? [1, 2, 3] : [1, 2, 3, 4, 5, 6];
  return (
    <div className={`flex w-full flex-wrap gap-4 ${home ? '' : 'px-8 py-4'}`}>
      {users.length === 0 && !loadingInProgress && <h2 className="text-center font-medium">No cases</h2>}
      {users.length > 0 && !loadingInProgress && users.map((user) => <Card key={user.id} userData={user} />)}
      {loadingInProgress && loadingSkeleton.map((item) => <CardSkeleton key={item} />)}
    </div>
  );
}
