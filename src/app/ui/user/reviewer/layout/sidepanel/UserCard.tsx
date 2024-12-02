export default function UserCard({ user, loadingUser, isOpen }: { user: any; loadingUser: boolean; isOpen: boolean }) {
  if (loadingUser) {
    return (
      <div className={`flex ${isOpen ? 'w-full' : ''} gap-2 rounded-xl bg-gray-900 p-2`}>
        <div className="flex w-full gap-2">
          <div className="min-h-[44px] min-w-[44px] animate-pulse rounded-lg bg-gray-500" />
          {isOpen && (
            <div className="flex w-full flex-col gap-2">
              <div className="h-[14px] w-[85%] animate-pulse rounded-sm bg-gray-500" />
              <div className="h-[11px] w-[65%] animate-pulse rounded-sm bg-gray-500" />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className={`flex ${isOpen ? 'w-full' : ''} gap-2 rounded-xl bg-gray-900 p-2`}>
        <img alt="User Image" className="rounded-lg" width={44} height={44} src={user.image} />
        {isOpen && (
          <div>
            <p className="text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-white">Reviewer</p>
          </div>
        )}
      </div>
    );
  }
  return null;
}
