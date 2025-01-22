import React from 'react';

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold">Term and Conditions RideNow</h1>
      <iframe src="/pdfs/termandconditions.pdf" className="h-screen w-full" style={{ height: '80vh' }} />
    </div>
  );
};

export default Page;
