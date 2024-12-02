'use client';
import HeaderSectionDashboard from '@/app/components/HeaderSectionDashboard';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { useSearchParams } from 'next/navigation';

import Cards from './Cards';
import NavType from './NavType';

export default function MyCases() {
  const { inProgressUsers } = useReviewerContext();
  const searchParams = useSearchParams();

  const searchPage = searchParams.get('page');
  const page = searchPage !== null ? parseInt(searchPage) : 1;
  const type = searchParams.get('type') || 'inprogress';

  const getUsersByType = (type: string) => {
    if (type === 'inprogress') {
      return inProgressUsers.filter(
        (user) => user.requirementsInReview === true || user.representativeInReview === true,
      );
    } else if (type === 'verified') {
      return inProgressUsers.filter(
        (user) =>
          (user.requirementsInReview === false || user.requirementsInReview === undefined) &&
          (user.representativeInReview === false || user.representativeInReview === undefined),
      );
    }
    return inProgressUsers;
  };
  return (
    <div className="flex h-full flex-col items-start overflow-auto overflow-x-hidden">
      <HeaderSectionDashboard title="My Cases" description="verify the requirements sent by users" />
      <NavType count={inProgressUsers.length} />
      <Cards users={getUsersByType(type).slice((page - 1) * 6, (page - 1) * 6 + 6)} />
    </div>
  );
}
