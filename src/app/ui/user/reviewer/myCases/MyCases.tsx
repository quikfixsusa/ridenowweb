'use client';
import HeaderSectionDashboard from '@/app/components/HeaderSectionDashboard';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { useSearchParams } from 'next/navigation';

import Cards from './Cards';
import NavType from './NavType';

export default function MyCases() {
  const { inProgressReviews } = useReviewerContext();
  const searchParams = useSearchParams();

  const searchPage = searchParams.get('page');
  const page = searchPage !== null ? parseInt(searchPage) : 1;
  const type = searchParams.get('type') || 'inprogress';

  const getReviewsByType = (type: string) => {
    if (type === 'inprogress') {
      return inProgressReviews.filter((review) => review.status !== 'completed');
    } else if (type === 'verified') {
      return inProgressReviews.filter((review) => review.status === 'completed');
    }
    return inProgressReviews;
  };
  return (
    <div className="flex h-full flex-col items-start overflow-auto overflow-x-hidden">
      <HeaderSectionDashboard title="My Cases" description="verify the requirements sent by users" />
      <NavType count={getReviewsByType(type).length} />
      <Cards reviews={getReviewsByType(type).slice((page - 1) * 6, (page - 1) * 6 + 6)} />
    </div>
  );
}
