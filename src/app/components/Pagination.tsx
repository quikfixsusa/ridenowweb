import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ count }: { count: number }) {
  const ITEM_PER_PAGE = 6;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page') || '1';

  const params = new URLSearchParams(searchParams);

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;
  const maxPage = Math.ceil(count / ITEM_PER_PAGE);

  const handleChangePage = (type: string) => {
    type === 'prev'
      ? params.set('page', (parseInt(page) - 1).toString())
      : params.set('page', (parseInt(page) + 1).toString());
    replace(`${pathname}?${params}`);
  };
  return (
    <div className="flex justify-center">
      <div className="flex">
        <button
          className="rounded-l-md border border-gray-300 bg-gray-200 px-4 disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={!hasPrev}
          onClick={() => handleChangePage('prev')}
        >
          «
        </button>
        <p className="border border-gray-300 bg-gray-100 px-6 py-2 text-sm">
          {page} / {maxPage}
        </p>
        <button
          className="rounded-r-md border border-gray-300 bg-gray-200 px-4 disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={!hasNext}
          onClick={() => handleChangePage('next')}
        >
          »
        </button>
      </div>
    </div>
  );
}
