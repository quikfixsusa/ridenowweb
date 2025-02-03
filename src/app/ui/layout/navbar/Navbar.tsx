import Link from 'next/link';

import Logo from './Logo';
import NavList from './NavList';
import RightButton from './RightButton';

const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-center">
      <div className="flex w-full max-w-[1440px] items-center justify-between p-4 xl:p-10">
        <Link href={'/'}>
          <Logo />
        </Link>
        <NavList />
        <RightButton />
      </div>
    </header>
  );
};

export default Navbar;
