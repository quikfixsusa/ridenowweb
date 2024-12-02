import AngleRightIcon from '@/app/components/svg/icons/AngleRightIcon';
import { useReviewerContext } from '@/app/lib/context/ReviewerContext';
import { User } from '@/app/lib/definitions';
import Link from 'next/link';

import Cards from '../myCases/Cards';

export default function InReviewCases() {
  const { inProgressUsers } = useReviewerContext();

  function sortByCreatedAt(arr: User[]) {
    return arr.sort((a, b) => {
      const dateA = a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000;
      const dateB = b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000;

      return dateA - dateB;
    });
  }

  const getUsersWithRequirementsInReview = () => {
    const inReviewUsers = inProgressUsers.filter(
      (user) =>
        user.requirements.some((req) => req.status === 'inReview') || user.representative?.status === 'inReview',
    );
    return sortByCreatedAt(inReviewUsers).slice(0, 2);
  };
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-5">
        <h2 className="text-2xl font-bold">In Review Cases</h2>
        <Link
          className="flex items-center gap-1 text-blue-600 transition-all duration-100 hover:underline"
          href="/user/reviewer/mycases"
        >
          <p>See all</p>
          <AngleRightIcon size={12} />
        </Link>
      </div>
      <Cards users={getUsersWithRequirementsInReview()} home={true} />
    </div>
  );
}
