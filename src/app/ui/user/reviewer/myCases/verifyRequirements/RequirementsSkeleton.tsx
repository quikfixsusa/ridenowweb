import CardRequirementSkeleton from './cardRequirement/CardRequirementSkeleton';

export default function RequirementsSectionSkeleton() {
  const skeletons = [1, 2, 3, 4];
  return (
    <div className="flex w-full flex-col gap-4 px-8 py-6">
      {skeletons.map((requirement) => (
        <CardRequirementSkeleton key={requirement} />
      ))}
    </div>
  );
}
