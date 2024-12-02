'use client';
import Customers from './ui/home/customers/Customers';
import DownloadOurApp from './ui/home/downloadOurApp/DownloadOurApp';
import HowItWorks from './ui/home/howItWorks/HowItWorks';
import PartnersSection from './ui/home/partners/PartnersSection';
import Presentation from './ui/home/presentation/Presentation';
import WhatWeOffer from './ui/home/whatWeOffer/WhatWeOffer';

export const runtime = 'edge';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Presentation />
      <PartnersSection />
      <WhatWeOffer />
      <HowItWorks />
      <Customers />
      <DownloadOurApp />
    </main>
  );
}
