import imageCard1 from '@/app/assets/images/card1.webp';
import imageCard2 from '@/app/assets/images/card2.webp';
import imageCard3 from '@/app/assets/images/card3.webp';
import { StaticImageData } from 'next/image';

export interface Card {
  image: StaticImageData;
  title: string;
  description: string;
}

const cardsInfo: Card[] = [
  {
    image: imageCard1,
    title: 'Instant Solutions!',
    description:
      'Forget long waits. With QuikFixs, connect with qualified professionals in minutes and schedule your services at your convenience. Your time is valuable!',
  },
  {
    image: imageCard2,
    title: 'Everything You Need, in One Place',
    description:
      'From household chores to auto repairs, our platform offers a wide variety of services. Find the right professional for every need, no matter how big or small.',
  },
  {
    image: imageCard3,
    title: 'Quality and Trust Guaranteed',
    description:
      'All our professionals are carefully selected and evaluated to ensure you receive the highest quality service.',
  },
];

export default cardsInfo;
