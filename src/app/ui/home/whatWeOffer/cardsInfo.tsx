import imageCard1 from '@/app/assets/images/ridenow-card1.webp';
import imageCard2 from '@/app/assets/images/ridenow-card2.webp';
import imageCard3 from '@/app/assets/images/ridenow-card3.webp';
import { StaticImageData } from 'next/image';

export interface Card {
  image: StaticImageData;
  title: string;
  description: string;
}

const cardsInfo: Card[] = [
  {
    image: imageCard1,
    title: 'Rides tailored to you',
    description:
      "Forget about the stress of transportation. With our app, find the perfect ride for you, whether it's a quick trip around the city or a longer journey. Choose from a variety of vehicles and verified drivers for a comfortable and safe experience.",
  },
  {
    image: imageCard2,
    title: 'Send Packages!',
    description:
      'Need to send a package or make an urgent delivery? We have a fast and reliable delivery service. Trust our fleet of vans and pickups to transport your items safely and efficiently.',
  },
  {
    image: imageCard3,
    title: 'No surprises in the fare',
    description:
      'We believe in full transparency. Before confirming your trip or shipment, we will show you the exact price so there are no surprises. In addition, our rates are competitive and fair, so you get the best value for your money.',
  },
];

export default cardsInfo;
