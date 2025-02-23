import iphoneImage from '@/app/assets/images/home-ridenow.png';
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
          <div>
            <h3 className="text-3xl font-light md:text-5xl">Travel and Drive</h3>
            <h3 className="text-3xl font-bold md:text-5xl">Ride anywhere any time!</h3>
          </div>
          <span className="text-base font-medium md:text-xl">
            Whether you&apos;re a passenger looking for a ride or a business needing to transport goods, our app
            connects you with the best drivers in your area.
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
