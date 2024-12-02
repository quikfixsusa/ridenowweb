'use client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import { User } from '../definitions';

interface homeTypes {
  user: User | null;
  setUser: Dispatch<any>;
  loadingUser: boolean;
  setLoadingUser: Dispatch<SetStateAction<boolean>>;
  inProgressUsers: User[];
  setInProgressUsers: Dispatch<SetStateAction<User[]>>;
  loadingInProgress: boolean;
  setLoadingInProgress: Dispatch<SetStateAction<boolean>>;
}

const ReviewerContext = createContext<homeTypes>({
  user: null,
  setUser: () => {},
  setLoadingUser: () => {},
  loadingUser: true,
  inProgressUsers: [],
  setInProgressUsers: () => {},
  loadingInProgress: true,
  setLoadingInProgress: () => {},
});

export function ReviewerWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [inProgressUsers, setInProgressUsers] = useState<User[]>([]);
  const [loadingInProgress, setLoadingInProgress] = useState(true);
  return (
    <ReviewerContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        setLoadingUser,
        inProgressUsers,
        setInProgressUsers,
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
