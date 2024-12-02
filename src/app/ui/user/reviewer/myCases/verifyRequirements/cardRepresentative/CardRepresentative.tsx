'use client';
import { Representative } from '@/app/lib/definitions';
import { useState } from 'react';

import ContentCard from './ContentCard';
import Header from './Header';

export default function CardRepresentative({ data, id }: { data: Representative; id: string }) {
  const [open, setOpen] = useState(false);
  const verificationSteps = `1. Find the State: Determine which state issued the driver's license.\n2. Visit the DMV Website: Go to the website of the Department of Motor Vehicles (DMV) for that state.\n3. Look for the Verification Tool: Search for a section or tool on the website that allows you to verify driver's licenses.\n4. Enter the Information: Follow the on-screen instructions. You'll usually need to enter the driver's license number`;
  return (
    <div className="flex flex-col rounded-lg border border-gray-300 p-6">
      <Header
        title={'Business Representative'}
        description={'Person who represents the company'}
        open={open}
        setOpen={setOpen}
        status={data.status}
      />
      {open && (
        <ContentCard
          name={`${data.firstName} ${data.lastName}`}
          phoneNumber={data.phoneNumber}
          jobTitle={data.jobTitle}
          verificationSteps={verificationSteps}
          status={data.status}
          link={data.driverLicense}
          note={data.note}
          id={id}
        />
      )}
    </div>
  );
}
