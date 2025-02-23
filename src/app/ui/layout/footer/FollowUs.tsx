import Facebook from '@/app/components/svg/socialMedia/Facebook';
import Instagram from '@/app/components/svg/socialMedia/Instagram';
import TikTok from '@/app/components/svg/socialMedia/TikTok';
import Youtube from '@/app/components/svg/socialMedia/Youtube';
import Link from 'next/link';
import { ReactElement } from 'react';

function ButtonSocialMedia({ icon, url }: { icon: ReactElement; url: string }) {
  return (
    <Link
      href={url}
      target="_blank"
      className="rounded-full border-[0.75px] border-gray-300 bg-white p-3 transition-all duration-150 hover:scale-105"
    >
      {icon}
    </Link>
  );
}

export default function FollowUs() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold text-black">Follow Us!</p>
      <div className="flex gap-3">
        <ButtonSocialMedia icon={<Facebook size={28} color="#000" />} url="https://facebook.com/@ridenowtaxis" />
        <ButtonSocialMedia icon={<Instagram size={28} color="#000" />} url="https://instagram.com/ridenowtaxis" />
        <ButtonSocialMedia icon={<TikTok size={28} color="#000" />} url="https://tiktok.com/@ridenowtaxis" />
        <ButtonSocialMedia icon={<Youtube size={28} color="#000" />} url="https://youtube.com/@ridenowtaxis" />
      </div>
    </div>
  );
}
