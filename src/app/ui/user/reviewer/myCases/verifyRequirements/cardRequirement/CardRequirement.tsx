'use client';
import { Requirement } from '@/app/lib/definitions';
import { useState } from 'react';

import ContentCard from './ContentCard';
import Header from './Header';

export default function CardRequirement({ data, id, vehicle }: { data: Requirement; id: string; vehicle?: boolean }) {
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
          id={id}
        />
      )}
    </div>
  );
}
