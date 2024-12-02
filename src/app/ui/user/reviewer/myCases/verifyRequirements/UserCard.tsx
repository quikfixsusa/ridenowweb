import { User } from '@/app/lib/definitions';

export default function UserCard({ user, loadingUser }: { user: User | undefined; loadingUser: boolean }) {
  if (loadingUser) {
    return (
      <div className={`flex w-full gap-2 rounded-xl bg-gray-900 p-2`}>
        <div className="flex w-full gap-2">
          <div className="min-h-[44px] min-w-[44px] animate-pulse rounded-lg bg-gray-500" />
          <div className="flex w-full flex-col gap-2">
            <div className="h-[14px] w-20 animate-pulse rounded-sm bg-gray-500" />
            <div className="h-[11px] w-16 animate-pulse rounded-sm bg-gray-500" />
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className={`flex w-full gap-2 rounded-xl bg-gray-900 py-2 pl-2 pr-4`}>
        {user.image && <img alt="User Image" className="rounded-lg" width={44} height={44} src={user.image} />}
        {!user.image && <div className="h-11 w-11 rounded-lg bg-gray-300" />}
        <div>
          <p className="text-white">{`${user.firstName ? user.firstName + ' ' + user.lastName : user.businessName}`}</p>
          <p className="text-sm text-white">{user.userType}</p>
        </div>
      </div>
    );
  }
  return null;
}
