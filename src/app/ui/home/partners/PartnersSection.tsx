import PMRemodelingLogo from '@/app/components/svg/PMRemodelingLogo';
import RESistemsLogo from '@/app/components/svg/RESistemsLogo';
import ViproLogo from '@/app/components/svg/ViproLogo';

export default function PartnersSection() {
  return (
    <section className="flex w-full items-center justify-center py-6 md:py-8">
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-6 px-0 md:px-10 lg:flex-row">
        <span className="px-4 text-xl md:px-0 md:text-3xl">
          <span className="font-black italic">Trusted partner</span> service providers choose QuikFixs
        </span>
        <div className="scroller flex max-w-full gap-14 overflow-hidden md:max-w-[70%]">
          <div className="flex h-14 animate-loop-scrollsm items-center gap-14 md:h-20 md:animate-loop-scroll">
            <PMRemodelingLogo color="black" />
            <RESistemsLogo color="black" />
            <ViproLogo color="black" />
          </div>
          <div
            className="flex h-14 animate-loop-scrollsm items-center gap-14 md:h-20 md:animate-loop-scroll"
            aria-hidden="true"
          >
            <PMRemodelingLogo color="black" />
            <RESistemsLogo color="black" />
            <ViproLogo color="black" />
          </div>
        </div>
      </div>
    </section>
  );
}
