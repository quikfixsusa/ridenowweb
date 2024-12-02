import { InputType } from '@/app/lib/definitions';
import { useState } from 'react';

import HidePasswordIcon from './svg/HidePasswordIcon';
import ShowPasswordIcon from './svg/ShowPasswordIcon';

const InputPassword = ({ value, onChange, placeholder, name, error, errorMessage, min, max }: InputType) => {
  const [secureInput, setSecureInput] = useState(true);
  const [type, setType] = useState('password');
  const handleChangeType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSecureInput(!secureInput);
    secureInput ? setType('text') : setType('password');
  };
  return (
    <div className="flex w-full flex-col">
      <label className="text-blueI text-sm">{placeholder}</label>

      <div className={`flex rounded-xl border-2 ${error ? 'border-red-700' : 'border-black'} gap-2 px-4 py-2`}>
        <input
          min={min}
          max={max}
          className={`w-full text-black outline-none transition-all duration-200`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />
        {secureInput ? (
          <button onClick={handleChangeType}>
            <ShowPasswordIcon />
          </button>
        ) : (
          <button onClick={handleChangeType}>
            <HidePasswordIcon />
          </button>
        )}
      </div>

      <label className="mt-1 text-sm text-red-700">{errorMessage}</label>
    </div>
  );
};

export default InputPassword;
