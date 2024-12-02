'use client';
import SuccesIcon from '@/app/components/svg/SuccesIcon';
import { useRouter } from 'next/navigation';

export default function SuccesUpdatePassword() {
  const router = useRouter();
  return (
    <main className="max-w-screen flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex max-w-[500px] flex-col items-center gap-4 rounded-xl border border-gray-500 p-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center rounded-full bg-yellowQuik p-14">
            <SuccesIcon />
          </div>
          <h3 className="mt-4 text-3xl font-bold text-black">Success!</h3>
          <p className="text-center text-sm text-gray-600">
            Your password was successfully restored, you can now log in.
          </p>
        </div>
        <button
          className="mt-4 w-full rounded-xl bg-blueQuik py-3 font-medium text-white"
          onClick={() => router.push('/')}
        >
          Go to home
        </button>
      </div>
    </main>
  );
}
