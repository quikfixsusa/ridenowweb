import { User } from '@/app/lib/definitions';

import CardCar from './cardRequirement/CardCar';
import CardRequirement from './cardRequirement/CardRequirement';

export default function RequirementsSection({ user }: { user: User }) {
  return (
    <div className="flex w-full flex-col gap-4 px-8 py-6">
      {user.vehicle && <CardCar data={user.vehicle} />}
      {user.vehicleRequirements.map((requirement) => (
        <CardRequirement key={requirement.title} data={requirement} id={user.id} />
      ))}
      {user.requirements.map((requirement) => (
        <CardRequirement key={requirement.title} data={requirement} id={user.id} />
      ))}
    </div>
  );
}
