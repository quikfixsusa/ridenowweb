'use client';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex items-start">
      {children}
      <ToastContainer />
    </main>
  );
};

export default DashboardLayout;
