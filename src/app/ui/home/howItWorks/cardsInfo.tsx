import card2Image from '@/app/assets/images/checkout.webp';
import card3Image from '@/app/assets/images/request-complete.webp';
import card1Image from '@/app/assets/images/searchServices.webp';

import { type CardProps } from './Card';

const cardsInfo: CardProps[] = [
  {
    title: 'Search Services',
    step: 1,
    description:
      'Select the service you need (plumbing, electrical, cleaning, etc.) and specify the details of your request.',
    image: card1Image,
  },
  {
    title: 'Your request is being processed!',
    step: 2,
    description:
      'Review the details of your request and confirm. We will notify you when we have found the ideal professional for your case.',
    image: card2Image,
  },
  {
    title: 'Your problem is already solved',
    step: 3,
    description: 'Our professional will arrive at the agreed time to perform the service. Relax and enjoy the results!',
    image: card3Image,
  },
];

export default cardsInfo;
