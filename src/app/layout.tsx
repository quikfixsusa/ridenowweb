'use client';
import './globals.css';
import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';

import { AppWrapper } from './lib/context/HomeContext';
import Footer from './ui/layout/footer/Footer';
import Navbar from './ui/layout/navbar/Navbar';
import Sidepanel from './ui/layout/sidepanel/Sidepanel';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isRuteNotLayout =
    pathname.startsWith('/auth') ||
    pathname.startsWith('/user') ||
    pathname.startsWith('/face') ||
    pathname.startsWith('/helpbot');
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="canonical" href="https://ridenowtaxis.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Travel safely wherever you want at any time!" />
        <title>RideNow</title>
      </head>
      <body className={poppins.className}>
        <AppWrapper>
          {!isRuteNotLayout && <Navbar />}
          {!isRuteNotLayout && <Sidepanel />}
          {children}
          {!isRuteNotLayout && <Footer />}
        </AppWrapper>
      </body>
    </html>
  );
}
