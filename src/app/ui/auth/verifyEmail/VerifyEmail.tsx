'use client';
import SpinLoader from '@/app/components/SpinLoader';
import LogoQuikFixs from '@/app/components/svg/LogoQuikFixs';
import { auth } from '@/app/lib/firebase';
import { applyActionCode } from 'firebase/auth';
import { useEffect, useState } from 'react';

import ContentCard from './ContentCard';

export default function VerifyEmail({ actionCode }: { actionCode: string }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    applyActionCode(auth, actionCode)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, [actionCode]);
  return (
    <section className="flex h-screen w-full items-center justify-center bg-white p-4">
      <article className="w-full max-w-[720px] rounded-xl bg-gray-100 pb-8">
        <header className="mainContainer flex w-full items-center justify-center bg-yellowQuik py-6">
          <LogoQuikFixs size={48} />
        </header>
        {loading ? <SpinLoader /> : <ContentCard />}
      </article>
    </section>
  );
}
