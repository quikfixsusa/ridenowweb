import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  isOpen: boolean;
  icon: JSX.Element;
  rute: string;
  name: string;
  onClick?: () => void;
}

export default function ButtonPanel({ icon, rute, name, onClick, isOpen }: Props) {
  const pathname = usePathname();
  return (
    <Link
      onClick={onClick}
      className={`flex ${isOpen ? 'w-full' : ''} items-center gap-2 rounded-md p-3 ${pathname === rute ? 'border border-blue-300 bg-blue-100 text-blueQuik' : 'text-gray-600'} transition-all duration-150 hover:bg-blueQuik hover:to-blue-900 hover:fill-white hover:text-white`}
      href={rute}
    >
      {icon}
      {isOpen && <p className="font-medium">{name}</p>}
    </Link>
  );
}
