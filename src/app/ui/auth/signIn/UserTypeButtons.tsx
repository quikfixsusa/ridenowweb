import { Dispatch, SetStateAction } from 'react';

const buttonsData = [
  { label: 'Reviewer', value: 'reviewer' },
  { label: 'Customer', value: 'customer' },
  { label: 'Contractor', value: 'contractor' },
];

export default function UserTypeButtons({
  setUserType,
  userType,
}: {
  setUserType: Dispatch<SetStateAction<string>>;
  userType: string;
}) {
  const handlePress = (value: string) => {
    setUserType(value);
  };
  return (
    <div className="flex flex-wrap gap-3">
      {buttonsData.map((button) => (
        <button
          key={button.value}
          onClick={() => handlePress(button.value)}
          className={`rounded-2xl border border-gray-500 px-6 py-1 text-sm ${userType === button.value ? 'bg-yellowQuik' : 'bg-transparent'}`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
