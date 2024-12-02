import MyCases from '@/app/ui/user/reviewer/myCases/MyCases';
import { Suspense } from 'react';

export default function InProgressView() {
  return (
    <Suspense>
      <MyCases />
    </Suspense>
  );
}
