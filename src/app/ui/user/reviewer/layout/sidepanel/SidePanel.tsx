import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { db } from '@/app/lib/firebase';
import axios from 'axios';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Buttons from './Buttons';
import Header from './Header';

export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(true);
  const { setUser, setLoadingUser, user, setInProgressUsers, setLoadingInProgress } = useReviewerContext();

  useEffect(() => {
    axios
      .get('/api/getuser', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setLoadingUser(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'users'), where('reviewer', '==', user.id));

      const unsub = onSnapshot(q, (docs) => {
        if (docs.size > 0) {
          const data: any[] = docs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setInProgressUsers(data);
        } else {
          setInProgressUsers([]);
        }
        setLoadingInProgress(false);
      });
      return unsub;
    }
  }, [user]);
  return (
    <div className="flex h-full min-h-screen flex-col border-r border-r-gray-300">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Buttons isOpen={isOpen} />
    </div>
  );
}
