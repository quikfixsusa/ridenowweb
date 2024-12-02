import Pagination from '../../../../components/Pagination';

export default function NavTypeCases({ count }: { count: number }) {
  return (
    <nav className="flex w-full items-center justify-end gap-10 border-b border-b-gray-300 px-8 py-3">
      <Pagination count={count} />
    </nav>
  );
}
