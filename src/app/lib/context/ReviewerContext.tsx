'use client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import { Review, User } from '../definitions';

interface homeTypes {
  user: User | null;
  setUser: Dispatch<any>;
  loadingUser: boolean;
  setLoadingUser: Dispatch<SetStateAction<boolean>>;
  inProgressReviews: Review[];
  setInProgressReviews: Dispatch<SetStateAction<Review[]>>;
  loadingInProgress: boolean;
  setLoadingInProgress: Dispatch<SetStateAction<boolean>>;
}

const ReviewerContext = createContext<homeTypes>({
  user: null,
  setUser: () => {},
  setLoadingUser: () => {},
  loadingUser: true,
  inProgressReviews: [],
  setInProgressReviews: () => {},
  loadingInProgress: true,
  setLoadingInProgress: () => {},
});

export function ReviewerWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [inProgressReviews, setInProgressReviews] = useState<Review[]>([]);
  const [loadingInProgress, setLoadingInProgress] = useState(true);
  return (
    <ReviewerContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        setLoadingUser,
        inProgressReviews,
        setInProgressReviews,
        loadingInProgress,
        setLoadingInProgress,
      }}
    >
      {children}
    </ReviewerContext.Provider>
  );
}

export function useReviewerContext() {
  return useContext(ReviewerContext);
}
