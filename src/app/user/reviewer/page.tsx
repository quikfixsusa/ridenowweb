import Reviewer from '@/app/ui/user/reviewer/Reviewer';
import { Suspense } from 'react';

export default function ReviewerView() {
  return (
    <Suspense>
      <Reviewer />
    </Suspense>
  );
}
