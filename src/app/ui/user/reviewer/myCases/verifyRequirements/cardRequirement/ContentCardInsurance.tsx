import { IDriverInsurance } from '@/app/lib/types/userTypes';
import dayjs from 'dayjs';
import Link from 'next/link';

import ButtonsInsurance from './ButtonsInsurance';
import ButtonsProof from './ButtonsProof';

interface Props {
  verificationSteps: string;
  data: IDriverInsurance;
  driverId: string;
  reviewId: string;
  requirementId: string;
}

export default function ContentCardInsurance({ verificationSteps, driverId, reviewId, data, requirementId }: Props) {
  const status = requirementId === 'insurance' ? data.status : data.monthly_checks[0].status;

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
      case 'in_review':
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
      case 'in_review':
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
              <p className="font-semibold">{dayjs(data.effective_date.seconds * 1000).format('MMMM D, YYYY')}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Expiration Date:</p>
              <p className="font-semibold">{dayjs(data.expiry_date.seconds * 1000).format('MMMM D, YYYY')}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Submitted:</p>
              <p className="font-semibold">{dayjs(data.submitted_at.seconds * 1000).format('MMMM D, YYYY')}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Next Due Date:</p>
              <p className="font-semibold">{dayjs(data.due_date.seconds * 1000).format('MMMM D, YYYY')}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-gray-500 p-4">
          <p className="text-lg font-semibold text-gray-700">Insurance Information</p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Policy Number</p>
              <p className="font-semibold">{data.policy_number}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Insurer</p>
              <p className="font-semibold">{data.insurer_name}</p>
            </div>
            <hr />
            <div className="flex justify-between gap-4">
              <p className="text-gray-600">Includes Rideshare</p>
              <p className="font-semibold">{data.includes_rideshare ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-600">Verification Steps:</p>
        <div>{formatText(verificationSteps)}</div>
      </div>

      <div className="flex items-center justify-between gap-3">
        {requirementId === 'insurance' && data.document_url && (
          <Link className="text-lg font-medium text-blue-600 hover:underline" href={data.document_url} target="_blank">
            View Attached Document
          </Link>
        )}
        <div className="flex flex-col gap-3">
          {requirementId === 'insurance_proof' && data.document_url && (
            <Link
              className="text-lg font-medium text-blue-600 hover:underline"
              href={data.document_url}
              target="_blank"
            >
              View Insurance
            </Link>
          )}
          {requirementId === 'insurance_proof' && data.monthly_checks[0].document_url && (
            <Link
              className="text-lg font-medium text-blue-600 hover:underline"
              href={data.monthly_checks[0].document_url}
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
          <ButtonsProof status={data.monthly_checks[0].status} driverId={driverId} reviewId={reviewId} />
        )}
      </div>
    </div>
  );
}
