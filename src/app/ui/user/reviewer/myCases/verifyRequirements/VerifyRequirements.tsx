'use client';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { User } from '@/app/lib/definitions';
import { db } from '@/app/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Content from './Content';

export default function VerifyRequirements({ id }: { id: string }) {
  const { inProgressReviews, loadingInProgress } = useReviewerContext();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const review = inProgressReviews.find((review) => review.id === id);

  useEffect(() => {
    if (review) {
      const q = doc(db, 'users', review.driverId);

      const unsub = onSnapshot(q, (doc) => {
        if (doc.exists()) {
          const data: User = { id: doc.id, ...doc.data() } as User;
          setUser(data);
          setLoading(false);
        }
      });
      return unsub;
    }
  }, []);
  return (
    <div className="overflow-auto overflow-x-hidden">
      {loading && <h1>Loading...</h1>}
      {user && !loading && <Content user={user} loadingInProgress={loadingInProgress} review={review} />}
    </div>
  );
}
