import { Insurance } from '@/app/lib/definitions';
import dayjs from 'dayjs';
import Link from 'next/link';

import ButtonsInsurance from './ButtonsInsurance';
import ButtonsProof from './ButtonsProof';

interface Props {
  verificationSteps: string;
  data: Insurance;
  driverId: string;
  reviewId: string;
  requirementId: string;
}

export default function ContentCardInsurance({ verificationSteps, driverId, reviewId, data, requirementId }: Props) {
  const status = requirementId === 'insurance' ? data.status : data.monthlyChecks[0].status;

  function formatText(text: string) {
    return text.split('*').map((line, index) => (
      <p className="text-gray-600" key={index}>
        {line}
        <br />
      </p>
    ));
  }

  function parseStatus(status: string) {
    switch (status) {
      case 'inReview':
        return 'In Review';
      case 'submitted':
        return 'Submitted';
      case 'approved':
        return 'Approved';
      case 'edit':
        return 'Edit';
      default:
        return 'Unknow';
    }
  }

  function getMessageByStatus(status: string) {
    switch (status) {
      case 'inReview':
        return 'This requirement has already been sent by the user, follow the steps and verify it.';
      case 'submitted':
        return 'This requirement has been sent by the user.';
      case 'approved':
        return 'This requirement has been approved.';
      case 'edit':
        return 'The user has to send the requirement again.';
      default:
        return 'This requirement is in the reception phase.';
    }
  }
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div>
        <p className="text-gray-600">
          <b>{parseStatus(status)}:</b> {getMessageByStatus(status)}
        </p>
      </div>

      <div className="flex items-start gap-6">
        <div className="flex flex-col gap-4 rounded-xl border border-gray-500 p-4">
          <p className="text-lg font-semibold text-gray-700">Important Dates</p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Effective Date:</p>
              <p className="font-semibold">{dayjs(data.effectiveDate.seconds * 1000).format('MMMM D, YYYY')}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Expiration Date:</p>
              <p className="font-semibold">{dayjs(data.expiryDate.seconds * 1000).format('MMMM D, YYYY')}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Submitted:</p>
              <p className="font-semibold">{dayjs(data.submittedAt.seconds * 1000).format('MMMM D, YYYY')}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Next Due Date:</p>
              <p className="font-semibold">{dayjs(data.dueDate.seconds * 1000).format('MMMM D, YYYY')}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-gray-500 p-4">
          <p className="text-lg font-semibold text-gray-700">Insurance Information</p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Policy Number</p>
              <p className="font-semibold">{data.policyNumber}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Insurer</p>
              <p className="font-semibold">{data.insurerName}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Includes Rideshare</p>
              <p className="font-semibold">{data.includesRideshare ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-600">Verification Steps:</p>
        <div>{formatText(verificationSteps)}</div>
      </div>

      <div className="flex items-center justify-between gap-3">
        {requirementId === 'insurance' && data.documentUrl && (
          <Link className="text-lg font-medium text-blue-600 hover:underline" href={data.documentUrl} target="_blank">
            View Attached Document
          </Link>
        )}
        <div className="flex flex-col gap-3">
          {requirementId === 'insurance_proof' && data.documentUrl && (
            <Link className="text-lg font-medium text-blue-600 hover:underline" href={data.documentUrl} target="_blank">
              View Insurance
            </Link>
          )}
          {requirementId === 'insurance_proof' && data.monthlyChecks[0].documentUrl && (
            <Link
              className="text-lg font-medium text-blue-600 hover:underline"
              href={data.monthlyChecks[0].documentUrl}
              target="_blank"
            >
              View Attached Proof
            </Link>
          )}
        </div>
        {requirementId === 'insurance' && (
          <ButtonsInsurance status={data.status} driverId={driverId} reviewId={reviewId} />
        )}
        {requirementId === 'insurance_proof' && (
          <ButtonsProof status={data.monthlyChecks[0].status} driverId={driverId} reviewId={reviewId} />
        )}
      </div>
    </div>
  );
}
