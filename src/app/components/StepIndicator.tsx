import { CheckCircle2 } from 'lucide-react';
import React from 'react';

interface StepIndicatorProps {
  currentStep: number; // 1: Intro, 2: License, 3: Face, 4: Result
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { label: 'Start', step: 1 },
    { label: 'License', step: 2 },
    { label: 'Face', step: 3 },
    { label: 'Done', step: 4 },
  ];

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-center border-b border-gray-100 bg-white px-6 py-4">
      <div className="flex items-center space-x-2">
        {steps.map((s, index) => (
          <React.Fragment key={s.step}>
            <div className={`flex flex-col items-center`}>
              {currentStep > s.step ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : currentStep === s.step ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-600">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full border-2 border-gray-200"></div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`h-0.5 w-8 ${currentStep > s.step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
