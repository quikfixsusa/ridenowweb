'use client';
import SuccesIcon from '@/app/components/svg/SuccesIcon';
import { useRouter } from 'next/navigation';

export default function ContentCard() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center px-4">
      <div className="mt-4 flex items-center justify-center rounded-full bg-yellowQuik p-14">
        <SuccesIcon />
      </div>
      <h3 className="mt-4 text-3xl font-bold text-black">Verified!</h3>
      <p className="text-center text-sm text-gray-600">
        Your Email was successfully verified, you can now use QuikFixs.
      </p>
      <button
        className="mt-4 w-full rounded-xl bg-blueQuik py-3 font-medium text-white"
        onClick={() => router.push('/')}
      >
        Go to home
      </button>
    </div>
  );
}
