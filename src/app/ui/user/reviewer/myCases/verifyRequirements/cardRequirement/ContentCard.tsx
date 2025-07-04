import Link from 'next/link';

import Buttons from './Buttons';
import ButtonsVehicle from './ButtonsVehicle';

interface Props {
  verificationSteps: string;
  note: string;
  link: string;
  status: 'reception' | 'inReview' | 'edit' | 'approved';
  title: string;
  format: string;
  value?: string;
  vehicle?: boolean;
  driverId: string;
  reviewId: string;
}

export default function ContentCard({
  verificationSteps,
  note,
  link,
  status,
  driverId,
  reviewId,
  title,
  value,
  vehicle,
}: Props) {
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
      case 'reception':
        return 'Reception';
      case 'approved':
        return 'Approved';
      case 'edit':
        return 'Edit';
      default:
        return 'Reception';
    }
  }

  function getMessageByStatus(status: string) {
    switch (status) {
      case 'inReview':
        return 'This requirement has already been sent by the user, follow the steps and verify it.';
      case 'reception':
        return 'This requirement has not yet been sent by the user.';
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
      {value && (
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-2xl font-bold text-black">{value}</p>
        </div>
      )}
      <div>
        <p className="text-lg font-semibold text-gray-600">Verification Steps:</p>
        <div>{formatText(verificationSteps)}</div>
      </div>
      {note && (
        <div>
          <p className="text-lg font-semibold text-gray-600">Edit Note:</p>
          <p className="text-sm text-red-600">{note}</p>
        </div>
      )}
      <div className="flex items-center justify-between gap-3">
        {link && (
          <Link className="text-lg font-medium text-blue-600 hover:underline" href={link} target="_blank">
            View Attached Document
          </Link>
        )}
        {!vehicle && <Buttons status={status} driverId={driverId} reviewId={reviewId} title={title} />}
        {vehicle && <ButtonsVehicle status={status} driverId={driverId} reviewId={reviewId} title={title} />}
      </div>
    </div>
  );
}
