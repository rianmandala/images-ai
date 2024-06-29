import { ChangeEvent } from 'react';

interface FormFieldProps {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSurpriseMe?: () => void;
  isSurpriseMe?: boolean;
}

const FormField = (props: FormFieldProps) => {
  const {
    handleChange,
    labelName,
    name,
    placeholder,
    type,
    value,
    disabled,
    handleSurpriseMe,
    isSurpriseMe,
  } = props;

  return (
    <>
      <div className="flex item-center gap-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border[#4649ff] outline-none block w-full p-3"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required
      />
    </>
  );
};

export default FormField;
