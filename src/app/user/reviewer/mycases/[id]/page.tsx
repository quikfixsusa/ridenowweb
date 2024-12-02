import VerifyRequirements from '@/app/ui/user/reviewer/myCases/verifyRequirements/VerifyRequirements';

export default function VerifyDetailsView({ params }: { params: { id: string } }) {
  return <VerifyRequirements id={params.id} />;
}
