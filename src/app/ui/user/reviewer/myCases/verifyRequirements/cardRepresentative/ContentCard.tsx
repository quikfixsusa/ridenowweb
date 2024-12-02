import Link from 'next/link';

import Buttons from './Buttons';

interface Props {
  id: string;
  verificationSteps: string;
  note: string;
  link: string;
  name: string;
  phoneNumber: string;
  jobTitle: string;
  status: 'reception' | 'inReview' | 'edit' | 'approved';
}

export default function ContentCard({ id, verificationSteps, note, link, status, name, phoneNumber, jobTitle }: Props) {
  function formatText(text: string) {
    return text.split('\n').map((line, index) => (
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
      <div>
        <p className="text-lg font-semibold text-gray-600">Contact Information:</p>
        <p className="text-base text-gray-600">
          Name: {name} <br />
          Phone Number: {phoneNumber} <br />
          Job Title: {jobTitle}
        </p>
      </div>
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
        <Buttons status={status} id={id} />
      </div>
    </div>
  );
}
