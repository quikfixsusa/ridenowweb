'use client';

import HeaderSectionDashboard from '@/app/components/HeaderSectionDashboard';

import DashboardContent from './dashboard/DasboardContent';

export default function Reviewer() {
  return (
    <div className="flex h-full flex-col items-start overflow-auto overflow-x-hidden">
      <HeaderSectionDashboard title="Reviewer Dashboard" description="Review users" />
      <DashboardContent />
    </div>
  );
}
