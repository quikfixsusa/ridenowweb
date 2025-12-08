'use client';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { db } from '@/app/lib/firebase';
import { IDriverUser } from '@/app/lib/types/userTypes';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Content from './Content';

export default function VerifyRequirements({ id }: { id: string }) {
  const { inProgressReviews, loadingInProgress } = useReviewerContext();
  const [loading, setLoading] = useState(true);
  const [driver, setDriver] = useState<IDriverUser | null>(null);

  const review = inProgressReviews.find((review) => review.id === id);

  useEffect(() => {
    if (review) {
      const q = doc(db, 'users', review.driver_id);

      const unsub = onSnapshot(q, (doc) => {
        if (doc.exists()) {
          const data = { id: doc.id, ...doc.data() } as IDriverUser;
          setDriver(data);
          setLoading(false);
        }
      });
      return unsub;
    }
  }, []);
  return (
    <div className="overflow-auto overflow-x-hidden">
      {loading && <h1>Loading...</h1>}
      {driver && !loading && <Content driver={driver} loadingInProgress={loadingInProgress} review={review} />}
    </div>
  );
}
