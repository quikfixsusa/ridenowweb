'use client';
import LogoQuikFixs from '@/app/components/svg/LogoQuikFixs';

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
              <LogoQuikFixs size={48} />
            </div>
            <FollowUs />
          </div>
          <div className="flex max-w-full flex-col gap-4 md:max-w-[45%]">
            <h3 className="text-2xl font-bold md:text-4xl">The solution to your problems, in the blink of an eye.</h3>
            <ButtonsStores />
          </div>
        </div>
        <div className="h-[1px] w-full bg-black" />
        <p className="pt-8 text-center text-sm md:text-base">© 2024 Quikfixs. All rights reserved.</p>
      </div>
    </footer>
  );
}
