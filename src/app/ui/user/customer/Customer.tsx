'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Customer() {
  const router = useRouter();
  const handleLogout = () => {
    axios
      .get('/api/logout', { withCredentials: true })
      .then(() => {
        router.push('/auth/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main className="mainContainer flex h-screen w-screen flex-col items-center justify-center gap-8 bg-yellowQuik px-4">
      <h2 className="text-5xl font-black italic text-black">Coming Soon.</h2>
      <button
        onClick={handleLogout}
        className="w-full max-w-[500px] rounded-xl bg-blueQuik py-3 font-semibold text-white"
      >
        Logout
      </button>
    </main>
  );
}
