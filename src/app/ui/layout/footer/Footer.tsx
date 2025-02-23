'use client';
import LogoRideNow from '@/app/components/svg/LogoRideNow';
import Link from 'next/link';

import ButtonsStores from './ButtonsStores';
import FollowUs from './FollowUs';

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center bg-yellowQuik pb-8">
      <div className="h-14 w-full rounded-b-[2.5rem] bg-white md:rounded-b-[4rem]" />
      <div className="w-full max-w-[1440px] px-4 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 py-7 md:flex-row md:gap-0 md:py-12">
          <div className="flex flex-col-reverse gap-8 md:flex-col md:gap-4">
            <div>
              <LogoRideNow size={48} />
            </div>
            <FollowUs />
          </div>
          <div className="flex max-w-full flex-col gap-4 md:max-w-[45%]">
            <div>
              <h3 className="text-2xl font-light md:text-4xl">Travel and Drive</h3>
              <h3 className="text-2xl font-bold md:text-4xl">Ride anywhere any time.</h3>
            </div>
            <ButtonsStores />
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-black" />
        <div className="flex flex-col items-center justify-center gap-8 pt-8 md:flex-row-reverse">
          <p className="text-center text-sm md:text-base">© 2025 RIDE NOW TAXIS, Inc.</p>
          <div className="flex items-center justify-center gap-8">
            <Link href="/terms" className="text-sm underline md:text-base">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm underline md:text-base">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm underline md:text-base">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
