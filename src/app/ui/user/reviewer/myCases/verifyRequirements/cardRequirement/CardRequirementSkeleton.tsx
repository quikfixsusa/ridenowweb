export default function CardRequirementSkeleton() {
  return (
    <div className="flex w-full flex-col rounded-lg border border-gray-300 p-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex w-full items-center gap-4">
          <div className="h-7 w-7 animate-pulse rounded-lg bg-gray-500" />
          <div className="flex w-full flex-col gap-2">
            <div className="h-5 w-[45%] animate-pulse rounded-sm bg-gray-500" />
            <div className="h-3 w-[40%] animate-pulse rounded-sm bg-gray-500" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-5 w-28 animate-pulse rounded-full bg-gray-500" />
          <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-500" />
        </div>
      </div>
    </div>
  );
}
