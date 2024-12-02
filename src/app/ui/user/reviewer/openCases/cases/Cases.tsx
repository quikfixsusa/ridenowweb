import Cards from './Cards';

interface CasesProps {
  usersData: any;
  loading: boolean;
}

export default function Cases({ usersData, loading }: CasesProps) {
  return (
    <section className="flex w-full px-8 py-4">
      <Cards loading={loading} usersData={usersData} />
    </section>
  );
}
