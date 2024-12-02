import FingerIcon from '@/app/components/svg/FingerIcon';
import ShopIcon from '@/app/components/svg/ShopIcon';
import WomenIcon from '@/app/components/svg/WomenIcon';
import { ButtonSidepanelProps } from '@/app/lib/definitions';

export const buttonsArray: ButtonSidepanelProps[] = [
  {
    svg: <ShopIcon size={24} color="black" />,
    rute: '#what-we-offer',
    name: 'What we offer',
  },
  {
    svg: <FingerIcon size={24} color="black" />,
    rute: '#how-it-works',
    name: 'How it Works',
  },
  {
    svg: <WomenIcon size={24} color="black" />,
    rute: '#customers',
    name: 'Customers',
  },
];
