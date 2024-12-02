import FacebookLogo from '@/app/components/svg/FacebookLogo';
import InstagramLogo from '@/app/components/svg/InstagramLogo';
import TiktokLogo from '@/app/components/svg/TiktokLogo';
import YoutubeLogo from '@/app/components/svg/YoutubeLogo';
import { ReactElement } from 'react';

function ButtonSocialMedia({ icon, url }: { icon: ReactElement; url: string }) {
  return (
    <button
      onClick={() => window.open(url)}
      className="rounded-full border-[0.75px] border-gray-300 bg-white p-3 transition-all duration-150 hover:scale-105"
    >
      {icon}
    </button>
  );
}

export default function FollowUs() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold text-black">Follow Us!</p>
      <div className="flex gap-3">
        <ButtonSocialMedia icon={<FacebookLogo size={28} />} url="https://facebook.com" />
        <ButtonSocialMedia icon={<InstagramLogo size={28} />} url="https://instagram.com" />
        <ButtonSocialMedia icon={<TiktokLogo size={28} />} url="https://tiktok.com" />
        <ButtonSocialMedia icon={<YoutubeLogo size={28} />} url="https://youtube.com" />
      </div>
    </div>
  );
}
