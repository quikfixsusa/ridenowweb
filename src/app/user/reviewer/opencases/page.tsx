import OpenCasesView from '@/app/ui/user/reviewer/openCases/OpenCases';
import { Suspense } from 'react';

export default function OpenCases() {
  return (
    <Suspense>
      <OpenCasesView />
    </Suspense>
  );
}
