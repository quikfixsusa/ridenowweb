import IconRideNow from '@/app/components/svg/IconRideNow';
import LogoRideNow from '@/app/components/svg/LogoRideNow';

export default function Logo() {
  return (
    <div>
      <div className="hidden xl:flex">
        <LogoRideNow size={48} />
      </div>
      <div className="xl:hidden">
        <IconRideNow size={40} />
      </div>
    </div>
  );
}
