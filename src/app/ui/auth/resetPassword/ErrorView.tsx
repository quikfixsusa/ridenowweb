import { useRouter } from 'next/navigation';

export default function ErrorView() {
  const router = useRouter();
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex max-w-[912px] flex-col items-center px-4">
        <h2 className="text-2xl font-bold text-black">Token expire or invalid</h2>
        <p className="text-lg font-normal text-gray-600">Try again</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 w-full rounded-xl bg-yellowQuik py-3 font-medium text-black"
        >
          Home
        </button>
      </div>
    </main>
  );
}
