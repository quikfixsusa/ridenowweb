'use client';
import HeaderSectionDashboard from '@/app/components/HeaderSectionDashboard';

import AccountSettings from './accountSettings/AccountSettings';

export default function SettingsView() {
  return (
    <div className="flex h-full flex-col items-start overflow-auto overflow-x-hidden">
      <HeaderSectionDashboard title="Reviewer Dashboard Settings" description="Save changes to apply" />
      <div className="flex w-full p-8">
        <AccountSettings />
      </div>
    </div>
  );
}
