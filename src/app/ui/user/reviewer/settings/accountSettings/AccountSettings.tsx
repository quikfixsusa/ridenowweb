import LockIcon from '@/app/components/svg/icons/LockIcon';

import SettingCard from '../settingCard/SettingCard';
import FormChangePassword from './FormChangePassword';

export default function AccountSettings() {
  return (
    <SettingCard
      title="Account Settings"
      description="Manage your account security and preferences."
      icon={<LockIcon size={24} />}
    >
      <FormChangePassword />
    </SettingCard>
  );
}
