import Pagination from '@/app/components/Pagination';
import CheckIcon from '@/app/components/svg/icons/CheckIcon';
import InProgressIcon from '@/app/components/svg/icons/InProgressIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import TypeButton from '../openCases/TypeButton';

const buttonsData = [
  { name: 'In Progress', icon: <InProgressIcon size={18} />, value: 'inprogress' },
  { name: 'Verified', icon: <CheckIcon size={18} />, value: 'verified' },
  // Add more buttons as needed
];

export default function NavType({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const type = searchParams.get('type') || 'inprogress';

  const handleChangeType = (type: string) => {
    params.set('type', type);
    params.set('page', '1');
    replace(`${pathname}?${params}`);
  };
  return (
    <nav className="flex w-full items-center justify-between gap-10 border-b border-b-gray-300 px-8">
      <div className="flex gap-10">
        {buttonsData.map((button, index) => (
          <TypeButton
            key={index}
            type={type}
            setType={handleChangeType}
            icon={button.icon}
            value={button.value}
            title={button.name}
          />
        ))}
      </div>
      <Pagination count={count} />
    </nav>
  );
}
