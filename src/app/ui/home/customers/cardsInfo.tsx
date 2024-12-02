import userImage3 from '@/app/assets/images/user1.webp';
import userImage1 from '@/app/assets/images/user2.webp';
import userImage2 from '@/app/assets/images/user3.webp';
import { type StaticImageData } from 'next/image';

export interface CardsProps {
  image: StaticImageData;
  review: string;
  name: string;
}

const cardsInfo = [
  {
    image: userImage1,
    review:
      '"I was so impressed with the quick and efficient service I received from QuikFixs. My sink was leaking and I needed it fixed ASAP. I placed a request and within an hour, a professional was at my door. The problem was fixed in no time and the technician was friendly and knowledgeable. I would definitely recommend QuikFixs to anyone!"',
    name: 'DAVID LEE',
  },
  {
    image: userImage2,
    review:
      '"QuikFixs saved my day! My air conditioning went out on the hottest day of the year. I was so relieved when I found QuikFixs and was able to book a repair right away. The technician was punctual and got my AC working again in no time. I am so grateful for their fast and reliable service."',
    name: 'SARAH KIM',
  },
  {
    image: userImage3,
    review: `"I've used QuikFixs for a few different services now, and I've always been happy with the results. The professionals they send are always friendly, efficient, and knowledgeable. I love that I can book an appointment online and have someone come out the same day. It's so convenient!"`,
    name: 'LUIS GARCIA',
  },
];

export default cardsInfo;
