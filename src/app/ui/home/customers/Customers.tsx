import Cards from './Cards';

export default function Customers() {
  return (
    <section className="mt-16 flex items-center justify-center pb-16" id="customers">
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-8 px-4 md:gap-12 md:px-10">
        <div className="flex flex-col items-center">
          <h2 className="flex flex-row gap-1 text-2xl font-medium md:gap-2 md:text-5xl">
            Customers <span className="text-2xl font-black italic text-yellowQuik md:text-5xl">Stories</span>
          </h2>
          <p className="max-w-[80%] text-center text-xs text-gray-600 md:max-w-[60%] md:text-xl">
            Discover what satisfied customers have to say about their experience with QuikFixs.
          </p>
        </div>
        <Cards />
      </div>
    </section>
  );
}
