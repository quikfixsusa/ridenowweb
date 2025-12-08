'use client';
import { DriverRequirement } from '@/app/lib/types/userTypes';
import { useState } from 'react';

import ContentCard from './ContentCard';
import Header from './Header';

interface CardRequirementProps {
  data: DriverRequirement;
  reviewId: string;
  driverId: string;
  vehicle?: boolean;
  insurance?: boolean;
}

export default function CardRequirement({ data, driverId, reviewId, vehicle }: CardRequirementProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 p-6">
      <Header
        title={data.title.es}
        description={data.description.es}
        open={open}
        setOpen={setOpen}
        status={data.status}
      />
      {open && (
        <ContentCard
          vehicle={vehicle}
          verificationSteps={data.verification_steps}
          format={data.format}
          value={data.value}
          status={data.status}
          link={data.link}
          note={data.note}
          title={data.title.es}
          idReq={data.id}
          driverId={driverId}
          reviewId={reviewId}
        />
      )}
    </div>
  );
}
