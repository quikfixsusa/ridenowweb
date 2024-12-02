import { User } from '@/app/lib/definitions';

import CardRepresentative from './cardRepresentative/CardRepresentative';
import CardRequirement from './cardRequirement/CardRequirement';

export default function RequirementsSection({ user }: { user: User }) {
  return (
    <div className="flex w-full flex-col gap-4 px-8 py-6">
      {user.requirements.map((requirement) => (
        <CardRequirement key={requirement.title} data={requirement} id={user.id} />
      ))}
      {user.representative && <CardRepresentative data={user.representative} id={user.id} />}
    </div>
  );
}
