import { InputType } from '@/app/lib/definitions';

const InputStyled = ({ value, onChange, placeholder, name, error, errorMessage, min, max, type }: InputType) => {
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
      </div>

      <label className="mt-1 text-sm text-red-700">{errorMessage}</label>
    </div>
  );
};

export default InputStyled;
