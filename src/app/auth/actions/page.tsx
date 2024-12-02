'use client';
import SpinLoader from '@/app/components/SpinLoader';
import { auth } from '@/app/lib/firebase';
import ErrorView from '@/app/ui/auth/resetPassword/ErrorView';
import ResetPassword from '@/app/ui/auth/resetPassword/ResetPassword';
import VerifyEmail from '@/app/ui/auth/verifyEmail/VerifyEmail';
import { verifyPasswordResetCode } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const runtime = 'edge';

export default function Actions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || '';
  const actionCode = searchParams.get('oobCode') || '';
  const [loading, setLoading] = useState(true);
  const [tokenError, setTokenError] = useState('');
  const [emailUser, setEmailUser] = useState('');

  useEffect(() => {
    if (mode !== 'resetPassword' && mode !== 'recoverEmail' && mode !== 'verifyEmail') {
      router.push('/');
    }
    verifyPasswordResetCode(auth, actionCode)
      .then((user) => {
        setEmailUser(user);
        setLoading(false);
      })
      .catch((error) => {
        setTokenError(error.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="max-w-screen flex min-h-screen flex-col items-center justify-center">
      {loading && <SpinLoader />}
      {mode === 'resetPassword' && tokenError === '' && loading === false && (
        <ResetPassword actionCode={actionCode} emailUser={emailUser} />
      )}
      {mode === 'verifyEmail' && tokenError === '' && loading === false && <VerifyEmail actionCode={actionCode} />}
      {tokenError !== '' && <ErrorView />}
    </div>
  );
}
