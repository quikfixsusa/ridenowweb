import { useAppContext } from '@/app/lib/context/HomeContext';
import { ButtonSidepanelProps } from '@/app/lib/definitions';
import Link from 'next/link';

export default function Button({ svg, name, rute }: ButtonSidepanelProps) {
  const { openSidePanel, setOpenSidePanel } = useAppContext();
  return (
    <Link
      onClick={() => {
        setOpenSidePanel(!openSidePanel);
      }}
      href={rute}
      className="flex w-full flex-row items-center gap-3 border-l-4 border-l-white py-6 pl-6 transition-all duration-150 hover:border-l-gray-400 hover:bg-gray-200"
    >
      {svg}
      <p className="font-medium">{name}</p>
    </Link>
  );
}
