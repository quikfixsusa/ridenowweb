import userImage3 from '@/app/assets/images/user1.webp';
import userImage1 from '@/app/assets/images/user2.webp';
import userImage2 from '@/app/assets/images/user3.webp';
import { type StaticImageData } from 'next/image';

export interface CardsProps {
  image: StaticImageData;
  review: string;
  name: string;
  typeUser: string;
}

const cardsInfo = [
  {
    image: userImage1,
    review: `"I'm thrilled with Ridenow! The app is very intuitive and allows me to request rides quickly and easily. Plus, I love that I can see the driver and vehicle information before confirming the trip. I feel very safe traveling with Ridenow!"`,
    name: 'DAVID LEE',
    typeUser: 'Passanger',
  },
  {
    image: userImage2,
    review: `"Ridenow is my new favorite travel app! It's so easy to use, the drivers are friendly and professional, and the prices are very competitive. I always find a ride quickly and safely, no matter the time or place. I highly recommend it!"`,
    name: 'SARAH KIM',
    typeUser: 'Passanger',
  },
  {
    image: userImage3,
    review: `"I've used QuikFixs for a few different services now, and I've always been happy with the results. The professionals they send are always friendly, efficient, and knowledgeable. I love that I can book an appointment online and have someone come out the same day. It's so convenient!"`,
    name: 'LUIS GARCIA',
    typeUser: 'Driver',
  },
];

export default cardsInfo;
