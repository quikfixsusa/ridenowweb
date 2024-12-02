import Cards from './Cards';

export default function WhatWeOffer() {
  return (
    <section className="mt-16 flex items-center justify-center pb-16" id="what-we-offer">
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-4 md:gap-12 md:px-10">
        <div className="flex flex-col items-center">
          <h2 className="flex flex-row gap-1 text-2xl font-medium md:gap-2 md:text-5xl">
            Discover What we <span className="text-2xl font-black italic text-yellowQuik md:text-5xl">Offer</span>
          </h2>
          <p className="text-xs text-gray-600 md:text-xl">A wide range of services to make your life easier.</p>
        </div>
        <Cards />
      </div>
    </section>
  );
}
