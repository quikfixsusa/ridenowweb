import IconQuikFixs from '@/app/components/svg/IconQuikFixs';
import SignInIcon from '@/app/components/svg/icons/SignInIcon';
import SignOutIcon from '@/app/components/svg/icons/SignOutIcon';
import LogoQuikFixs from '@/app/components/svg/LogoQuikFixs';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ isOpen, setIsOpen }: Props) {
  return (
    <div
      className={`flex ${isOpen ? 'flex-row' : 'flex-col'} items-center justify-center gap-4 border-b border-b-gray-300 px-4 py-4`}
    >
      <div className={`${isOpen ? 'flex' : 'hidden'}`}>
        <LogoQuikFixs size={40} />
      </div>
      <div className={`${isOpen ? 'hidden' : 'flex'}`}>
        <IconQuikFixs size={40} />
      </div>
      <button
        className="rounded-lg border border-transparent p-2 transition-all duration-150 hover:border-gray-400 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <SignInIcon size={20} color="black" /> : <SignOutIcon size={20} color="black" />}
      </button>
    </div>
  );
}
