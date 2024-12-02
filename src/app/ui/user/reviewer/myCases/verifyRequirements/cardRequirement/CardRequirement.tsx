'use client';
import { Requirement } from '@/app/lib/definitions';
import { useState } from 'react';

import ContentCard from './ContentCard';
import Header from './Header';

export default function CardRequirement({ data, id }: { data: Requirement; id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 p-6">
      <Header title={data.title} description={data.description} open={open} setOpen={setOpen} status={data.status} />
      {open && (
        <ContentCard
          verificationSteps={data.verificationSteps}
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
