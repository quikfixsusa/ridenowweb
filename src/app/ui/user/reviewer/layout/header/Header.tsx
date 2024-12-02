import BellIcon from '@/app/components/svg/icons/BellIcon';
import LogoutIcon from '@/app/components/svg/icons/LogoutIcon';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import SearchInput from './SearchInput';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await Swal.fire({
      html: `
        <div class="flex flex-col items-start w-full">
          <p class="text-2xl text-start font-bold text-black">Sing out</p>
          <p class="text text-start text-base text-gray-600">Are you sure you want sign out?</p>
        </div>
      `,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#263AFF',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Sign out',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          const response = await axios.get('/api/logout', { withCredentials: true });
          if (response.status === 202) {
            router.push('/auth/login');
          }
        } catch (error) {
          Swal.showValidationMessage(`
            Cannot sign out. Try again.
          `);
        }
      },
    });
  };
  return (
    <header className="flex w-full items-center justify-between border-b border-b-gray-300 p-4">
      <SearchInput />
      <div className="flex gap-3">
        <button className="rounded-lg border border-yellow-700 bg-yellow-200 p-2 transition-all duration-150 hover:bg-yellowQuik">
          <BellIcon size={20} color="black" />
        </button>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-red-700 bg-red-400 p-2 transition-all duration-150 hover:bg-red-600"
        >
          <LogoutIcon size={20} color="white" />
        </button>
      </div>
    </header>
  );
}
