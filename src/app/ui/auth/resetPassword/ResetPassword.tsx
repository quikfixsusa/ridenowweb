'use client';
import PatternLeft from './PatternLeft';
import ResetPasswordBox from './ResetPasswordBox';

export default function ResetPassword({ actionCode, emailUser }: { actionCode: string; emailUser: string }) {
  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row-reverse">
      <PatternLeft />
      <ResetPasswordBox emailUser={emailUser} actionCode={actionCode} />
    </main>
  );
}
