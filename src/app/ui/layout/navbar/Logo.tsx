import IconQuikFixs from '@/app/components/svg/IconQuikFixs';
import LogoQuikFixs from '@/app/components/svg/LogoQuikFixs';

export default function Logo() {
  return (
    <div>
      <div className="hidden xl:flex">
        <LogoQuikFixs size={48} />
      </div>
      <div className="xl:hidden">
        <IconQuikFixs size={40} />
      </div>
    </div>
  );
}
