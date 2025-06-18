import { Requirement, User } from '@/app/lib/definitions';

import CardCar from './cardRequirement/CardCar';
import CardInsurance from './cardRequirement/CardInsurance';
import CardRequirement from './cardRequirement/CardRequirement';

interface ContentProps {
  user: User;
  showCarDetails: boolean;
  requirementId: string;
  vehicle?: boolean;
  reviewId: string;
}

export default function RequirementsSection({ user, showCarDetails, requirementId, vehicle, reviewId }: ContentProps) {
  function getRequirementById(requirementId: string): Requirement | undefined {
    if (requirementId === 'vehicle_registration') {
      return user.vehicleRequirements.find((req: Requirement) => req.id === requirementId);
    } else {
      return user.requirements.find((req: Requirement) => req.id === requirementId);
    }
  }
  const requirement = getRequirementById(requirementId);
  const insurance = requirementId === 'insurance' || requirementId === 'insurance_proof' ? user.insurance : null;
  return (
    <div className="flex w-full flex-col gap-4 px-8 py-6">
      {((showCarDetails && user.vehicle) || insurance) && <CardCar data={user.vehicle} />}
      {requirement && <CardRequirement data={requirement} driverId={user.id} reviewId={reviewId} vehicle={vehicle} />}
      {insurance && (
        <CardInsurance data={insurance} driverId={user.id} reviewId={reviewId} requirementId={requirementId} />
      )}
    </div>
  );
}
