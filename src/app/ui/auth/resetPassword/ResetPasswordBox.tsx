import LogoQuikFixs from '@/app/components/svg/LogoQuikFixs';
import Link from 'next/link';

import FormResetPassword from './FormResetPassword';

export default function ResetPasswordBox({ emailUser, actionCode }: { emailUser: string; actionCode: string }) {
  return (
    <section className="flex min-h-full w-full flex-col items-center justify-between px-8 py-16 sm:px-24">
      <div className="flex w-full flex-col items-center gap-7">
        <div className="hidden md:block">
          <LogoQuikFixs size={48} />
        </div>
        <div>
          <h3 className="text-blueI text-center text-4xl font-black">New Password</h3>
          <p className="text-center text-sm text-gray-600">Enter your new password for &apos;{emailUser}&apos;</p>
        </div>
        <FormResetPassword actionCode={actionCode} />
      </div>
      <p className="mt-10 text-center text-sm text-black sm:text-base">
        Don&apos;t you want to reset your password?{' '}
        <Link className="font-bold text-black underline" href="/">
          Home
        </Link>
      </p>
    </section>
  );
}
