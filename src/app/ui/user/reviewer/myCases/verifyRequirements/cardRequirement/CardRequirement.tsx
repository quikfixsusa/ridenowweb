'use client';
import { Requirement } from '@/app/lib/definitions';
import { useState } from 'react';

import ContentCard from './ContentCard';
import Header from './Header';

interface CardRequirementProps {
  data: Requirement;
  reviewId: string;
  driverId: string;
  vehicle?: boolean;
  insurance?: boolean;
}

export default function CardRequirement({ data, driverId, reviewId, vehicle }: CardRequirementProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 p-6">
      <Header title={data.title} description={data.description} open={open} setOpen={setOpen} status={data.status} />
      {open && (
        <ContentCard
          vehicle={vehicle}
          verificationSteps={data.verificationSteps}
          format={data.format}
          value={data.value}
          status={data.status}
          link={data.link}
          note={data.note}
          title={data.title}
          driverId={driverId}
          reviewId={reviewId}
        />
      )}
    </div>
  );
}
