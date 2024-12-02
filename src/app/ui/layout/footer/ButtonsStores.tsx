import ButtonAppleStore from '@/app/components/svg/ButtonAppleStore';
import ButtonGooglePlay from '@/app/components/svg/ButtonGooglePlay';

export default function ButtonsStores() {
  return (
    <div className="flex gap-3 md:gap-5">
      <button className="h-12 transition-all duration-150 hover:scale-105 hover:opacity-90 md:h-16">
        <ButtonGooglePlay />
      </button>
      <button className="h-12 transition-all duration-150 hover:scale-105 hover:opacity-80 md:h-16">
        <ButtonAppleStore />
      </button>
    </div>
  );
}
