import RightArrowIcon from '@/app/components/svg/RightArrowIcon';

export default function BetaAvailable() {
  return (
    <div className="flex flex-row items-center gap-4 rounded-full bg-[#DDE0FF] py-2 pl-2 pr-6">
      <div className="rounded-full bg-blueQuik px-4 py-1 md:px-6 md:py-2">
        <span className="text-sm font-medium text-white md:text-xl">New</span>
      </div>
      <span className="text-sm font-medium text-blueQuik md:text-xl">Beta now availble</span>
      <RightArrowIcon size={24} color="#263aff" />
    </div>
  );
}
