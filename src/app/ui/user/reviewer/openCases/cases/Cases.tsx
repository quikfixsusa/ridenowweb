import Cards from './Cards';

interface CasesProps {
  reviewsData: any;
  loading: boolean;
}

export default function Cases({ reviewsData, loading }: CasesProps) {
  return (
    <section className="flex w-full px-8 py-4">
      <Cards loading={loading} reviewsData={reviewsData} />
    </section>
  );
}
