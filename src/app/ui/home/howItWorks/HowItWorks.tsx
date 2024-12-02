import Cards from './Cards';

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mainContainer mt-10 flex w-full items-center justify-center rounded-3xl bg-yellowQuik py-8 md:py-12"
    >
      <div className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-12 px-4 md:px-10">
        <h2 className="text-center text-3xl text-black md:text-5xl">
          <span className="font-black italic">3 Easy Steps</span>
          <br />
          to a QuikFix
        </h2>
        <Cards />
      </div>
    </section>
  );
}
