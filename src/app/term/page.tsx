import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Term and Conditions RideNow</h1>
      <iframe
        src="/pdfs/termandconditions.pdf"
        className="w-full h-screen"
        style={{ height: '80vh' }}
      />
    </div>
  );
};

export default Page;
