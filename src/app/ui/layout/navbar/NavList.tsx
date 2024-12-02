import Link from 'next/link';

export default function NavList() {
  const linkStyle = 'font-medium text-black transition-all duration-150 hover:text-blue-600';
  return (
    <nav className="hidden xl:flex">
      <ul className="flex gap-8">
        <Link href="#what-we-offer" className={linkStyle}>
          What we offer
        </Link>
        <Link href="#how-it-works" className={linkStyle}>
          How it Works
        </Link>
        <Link href="#customers" className={linkStyle}>
          Customers
        </Link>
      </ul>
    </nav>
  );
}
