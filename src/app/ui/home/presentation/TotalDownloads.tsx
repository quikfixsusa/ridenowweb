import user1Image from '@/app/assets/images/user1.webp';
import user2Image from '@/app/assets/images/user2.webp';
import user3Image from '@/app/assets/images/user3.webp';
import Image from 'next/image';

export default function TotalDownloads() {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <div className="flex">
        <Image
          src={user1Image}
          alt="user1"
          width={60}
          height={60}
          className="mr-[-8px] aspect-square w-10 rounded-full border-2 border-white md:mr-[-16px] md:w-14 md:border-[4px]"
        />
        <Image
          src={user2Image}
          alt="user2"
          width={60}
          height={60}
          className="mr-[-8px] aspect-square w-10 rounded-full border-2 border-white md:mr-[-16px] md:w-14 md:border-[4px]"
        />
        <Image
          src={user3Image}
          alt="user3"
          width={60}
          height={60}
          className="w-10 rounded-full border-2 border-white md:w-14 md:border-[4px]"
        />
      </div>
      <span className="text-lg font-semibold md:text-2xl">200K+ Downloads</span>
    </div>
  );
}
