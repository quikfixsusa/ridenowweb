import HomeIcon from '@/app/components/svg/icons/HomeIcon';
import MyCasesIcon from '@/app/components/svg/icons/MyCasesIcon';
import OpenCasesIcon from '@/app/components/svg/icons/OpenCasesIcon';
import SettingsIcon from '@/app/components/svg/icons/SettingsIcon';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';

import ButtonPanel from './ButtonPanel';
import UserCard from './UserCard';

const buttonsData = [
  { name: 'Dashboard', icon: <HomeIcon size={20} />, rute: '/user/reviewer' },
  { name: 'My Cases', icon: <MyCasesIcon size={20} />, rute: '/user/reviewer/mycases' },
  { name: 'Open Cases', icon: <OpenCasesIcon size={20} />, rute: '/user/reviewer/opencases' },
  { name: 'Settings', icon: <SettingsIcon size={20} />, rute: '/user/reviewer/settings' },
  // Add more buttons as needed
];

export default function Buttons({ isOpen }: { isOpen: boolean }) {
  const { user, loadingUser } = useReviewerContext();
  return (
    <div className="flex flex-1 flex-col items-center justify-between px-2 py-4">
      <div className={`flex flex-col gap-2 ${isOpen ? 'w-full' : 'items-center'}`}>
        <p className="mb-2 font-semibold text-gray-500">Menu</p>
        {buttonsData.map((button, index) => (
          <ButtonPanel key={index} isOpen={isOpen} icon={button.icon} name={button.name} rute={button.rute} />
        ))}
      </div>
      <UserCard user={user} loadingUser={loadingUser} isOpen={isOpen} />
    </div>
  );
}
