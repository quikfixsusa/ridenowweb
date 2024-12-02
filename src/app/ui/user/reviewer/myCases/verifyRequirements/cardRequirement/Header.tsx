import AngleDownIcon from '@/app/components/svg/icons/AngleDownIcon';
import AngleUpIcon from '@/app/components/svg/icons/AngleUpIcon';
import CheckIcon from '@/app/components/svg/icons/CheckIcon';
import EditIcon from '@/app/components/svg/icons/EditIcon';
import InProgressIcon from '@/app/components/svg/icons/InProgressIcon';
import InReviewIcon from '@/app/components/svg/icons/InReviewIcon';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  title: string;
  description: string;
  status: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ title, description, status, open, setOpen }: Props) {
  const toggleOpen = () => setOpen(!open);

  function getIconByStatus() {
    switch (status) {
      case 'inReview':
        return <InReviewIcon size={28} />;
      case 'reception':
        return <InProgressIcon size={28} />;
      case 'approved':
        return <CheckIcon size={28} />;
      case 'edit':
        return <EditIcon size={28} />;
      default:
        return <InProgressIcon size={28} />;
    }
  }

  function getColorByStatus() {
    switch (status) {
      case 'inReview':
        return 'text-blueQuik';
      case 'reception':
        return 'text-yellowQuik';
      case 'approved':
        return 'text-green-500';
      case 'edit':
        return 'text-orange-500';
      default:
        return 'text-yellowQuik';
    }
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

  function getColorStatus(status: string) {
    switch (status) {
      case 'inReview':
        return 'bg-blue-200 text-blue-600';
      case 'reception':
        return 'bg-yellow-200 text-yellow-700';
      case 'approved':
        return 'bg-green-200 text-green-600';
      case 'edit':
        return 'bg-orange-200 text-orange-600';
      default:
        return 'bg-yellow-200 text-yellow-700';
    }
  }
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className={getColorByStatus()}>{getIconByStatus()}</div>
        <div>
          <p className="text-xl font-semibold text-black">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className={`rounded-full ${getColorStatus(status)} px-4 py-1 text-sm font-medium`}>{parseStatus(status)}</p>
        <button
          onClick={toggleOpen}
          className="rounded-md p-3 text-black transition-all duration-150 hover:bg-gray-100"
        >
          {open ? <AngleUpIcon size={18} /> : <AngleDownIcon size={18} />}
        </button>
      </div>
    </div>
  );
}
