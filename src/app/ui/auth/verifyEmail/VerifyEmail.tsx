'use client';

import SpinLoader from '@/app/components/SpinLoader';
import LogoRideNow from '@/app/components/svg/LogoRideNow';
import { auth, db } from '@/app/lib/firebase';
import { checkActionCode } from 'firebase/auth';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import ContentCard from './ContentCard';

export default function VerifyEmail({ actionCode }: { actionCode: string }) {
  const [loading, setLoading] = useState(false);

  async function verifyEmail() {
    try {
      const info = await checkActionCode(auth, actionCode);
      const userQuery = query(collection(db, 'users'), where('email', '==', info.data.email));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        throw new Error('User not found');
      }
      const userDoc = userSnapshot.docs[0];
      await updateDoc(userDoc.ref, { email_verified: true });
      console.log('email verified');
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyEmail();
  }, [actionCode]);
  return (
    <section className="flex h-screen w-full items-center justify-center bg-white p-4">
      <article className="w-full max-w-[720px] rounded-xl bg-gray-100 pb-8">
        <header className="mainContainer flex w-full items-center justify-center bg-yellowQuik py-6">
          <LogoRideNow size={48} />
        </header>
        {loading ? <SpinLoader /> : <ContentCard />}
      </article>
    </section>
  );
}
