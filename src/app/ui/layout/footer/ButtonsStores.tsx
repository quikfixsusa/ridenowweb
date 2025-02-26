import ButtonAppleStore from '@/app/components/svg/ButtonAppleStore';
import ButtonGooglePlay from '@/app/components/svg/ButtonGooglePlay';
import Link from 'next/link';

export default function ButtonsStores() {
  return (
    <div className="flex gap-3 md:gap-5">
      <Link
        href={'https://play.google.com/store/apps/details?id=com.ridenow.taxi'}
        target="_blank"
        className="h-12 transition-all duration-150 hover:scale-105 md:h-16"
      >
        <ButtonGooglePlay />
      </Link>
      <Link
        href={'https://apps.apple.com/us/app/id6742415073'}
        target="_blank"
        className="h-12 transition-all duration-150 hover:scale-105 md:h-16"
      >
        <ButtonAppleStore />
      </Link>
    </div>
  );
}
