import { DriverRequirementType } from '@/app/lib/types/reviewsTypes';
import { DriverRequirement, IDriverUser } from '@/app/lib/types/userTypes';

import CardCar from './cardRequirement/CardCar';
import CardInsurance from './cardRequirement/CardInsurance';
import CardRequirement from './cardRequirement/CardRequirement';

interface ContentProps {
  driver: IDriverUser;
  showCarDetails: boolean;
  requirementId: DriverRequirementType;
  vehicle?: boolean;
  reviewId: string;
}

export default function RequirementsSection({
  driver,
  showCarDetails,
  requirementId,
  vehicle,
  reviewId,
}: ContentProps) {
  function getRequirementById(): DriverRequirement | undefined {
    if (
      requirementId === 'vehicle_registration' ||
      requirementId === 'rcv_insurance' ||
      requirementId === 'circulation_permit' ||
      requirementId === 'vehicle_title'
    ) {
      return driver.vehicle_requirements.find((req: DriverRequirement) => req.id === requirementId);
    } else {
      return driver.requirements.find((req: DriverRequirement) => req.id === requirementId);
    }
  }
  const requirement = getRequirementById();
  const insurance = requirementId === 'insurance' || requirementId === 'insurance_proof' ? driver.insurance : null;
  return (
    <div className="flex w-full flex-col gap-4 px-8 py-6">
      {((showCarDetails && driver.vehicle) || (insurance && driver.vehicle)) && <CardCar data={driver.vehicle} />}
      {requirement && <CardRequirement data={requirement} driverId={driver.id} reviewId={reviewId} vehicle={vehicle} />}
      {insurance && (
        <CardInsurance data={insurance} driverId={driver.id} reviewId={reviewId} requirementId={requirementId} />
      )}
    </div>
  );
}
