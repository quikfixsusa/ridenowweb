import card3Image from '@/app/assets/images/ride-safe.webp';
import card2Image from '@/app/assets/images/select-a-ride.webp';
import card1Image from '@/app/assets/images/where-you-go.webp';

import { type CardProps } from './Card';

const cardsInfo: CardProps[] = [
  {
    title: 'Where you going?',
    step: 1,
    description: 'Find the destination where you are going',
    image: card1Image,
  },
  {
    title: 'Select a ride!',
    step: 2,
    description: 'Choose the trip that best suits you',
    image: card2Image,
  },
  {
    title: 'Ride Safe',
    step: 3,
    description: 'Wait for your driver and get to your destination',
    image: card3Image,
  },
];

export default cardsInfo;
