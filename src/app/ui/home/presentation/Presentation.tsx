import iphoneImage from '@/app/assets/images/iphone-app-view.webp';
import Image from 'next/image';

import BetaAvailable from './BetaAvailable';
import ButtonsStores from './ButtonsStores';
import TotalDownloads from './TotalDownloads';

export default function Presentation() {
  return (
    <div className="flex w-full items-center justify-center rounded-3xl bg-gradient-to-t from-yellowQuik md:rounded-b-[3rem]">
      <div className="flex w-full max-w-[1440px] flex-row items-center justify-center gap-10 px-4 md:px-10">
        <div className="flex flex-col items-start justify-start gap-8 py-8">
          <BetaAvailable />
          <h3 className="text-3xl font-bold md:text-5xl">The solution to your problems, in the blink of an eye.</h3>
          <span className="text-base font-medium md:text-xl">
            The solution to all your home problems is a tap away. Home repair, maintenance, and improvement services,
            all in one app.
          </span>
          <ButtonsStores />
          <TotalDownloads />
        </div>
        <Image
          src={iphoneImage}
          alt="presentation"
          width={450}
          height={900}
          className="hidden h-[38rem] min-w-96 object-cover object-top lg:flex"
        />
      </div>
    </div>
  );
}
