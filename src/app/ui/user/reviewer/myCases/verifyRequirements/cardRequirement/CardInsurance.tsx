'use client';
import { Insurance } from '@/app/lib/definitions';
import { useState } from 'react';

import ContentCardInsurance from './ContentCardInsurance';
import Header from './Header';

interface CardInsuranceProps {
  data: Insurance;
  reviewId: string;
  driverId: string;
  requirementId: string;
}

const insuranceVerificationSteps = `1. Make sure the insurance is under the driver's name.*2. Check that all provided dates are consistent and not expired.*3. Verify the vehicle listed matches the registered vehicle.*4. Ensure the policy includes rideshare coverage.`;
const insurancePaymentProofSteps = `1. Confirm the document shows a payment made for the current month.*2. Check that the payment date is recent and clearly visible.*3. Make sure the driver's name appears on the receipt or statement.*4. Verify that the policy or vehicle information matches the registered details.`;

export default function CardInsurance({ data, driverId, reviewId, requirementId }: CardInsuranceProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 p-6">
      {requirementId === 'insurance' && (
        <Header
          title={'Insurance'}
          description={'Document to verify the insurance of the vehicle'}
          open={open}
          setOpen={setOpen}
          status={data.status}
        />
      )}
      {requirementId === 'insurance_proof' && (
        <Header
          title={'Insurance Payment Proof'}
          description={'Document to verify the payment of insurance of the vehicle'}
          open={open}
          setOpen={setOpen}
          status={data.monthlyChecks[0].status}
        />
      )}
      {open && (
        <ContentCardInsurance
          verificationSteps={requirementId === 'insurance' ? insuranceVerificationSteps : insurancePaymentProofSteps}
          data={data}
          driverId={driverId}
          reviewId={reviewId}
          requirementId={requirementId}
        />
      )}
    </div>
  );
}
