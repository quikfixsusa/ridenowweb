'use client';
import HeaderSectionDashboard from '@/app/components/HeaderSectionDashboard';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { db } from '@/app/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Cases from './cases/Cases';
import NavTypeCases from './NavTypeCases';

export default function OpenCasesView() {
  const { user } = useReviewerContext();
  const [reviewsData, setReviewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const searchPage = searchParams.get('page');
  const page = searchPage !== null ? parseInt(searchPage) : 1;

  function sortByCreatedAt(arr: any[]) {
    return arr.sort((a, b) => {
      const dateA = a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000;
      const dateB = b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000;

      return dateA - dateB;
    });
  }

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(query(collection(db, 'driverReviews'), where('reviewerId', '==', null)), (docs) => {
        if (docs.size > 0) {
          const data = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setReviewsData(sortByCreatedAt(data));
        } else {
          setReviewsData([]);
        }
        setLoading(false);
      });
      return unsub;
    }
  }, [user]);
  return (
    <div className="flex h-full flex-col items-start overflow-auto overflow-x-hidden">
      <HeaderSectionDashboard
        title="Open Cases"
        description="accepts requests from contractors to verify their requirements"
      />
      <NavTypeCases count={reviewsData.length} />
      <Cases reviewsData={reviewsData.slice((page - 1) * 6, (page - 1) * 6 + 6)} loading={loading} />
    </div>
  );
}
