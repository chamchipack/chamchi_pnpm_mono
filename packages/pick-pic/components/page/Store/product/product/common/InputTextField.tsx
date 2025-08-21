'use client';

interface InputTextFieldProps {
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  inputMaxLength?: number;
  isMaxLengthOn?: boolean;
}

export default function InputTextField({
  value,
  setValue,
  placeholder = '문구를 입력해주세요',
  inputMaxLength = 50,
  isMaxLengthOn = false,
}: InputTextFieldProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        maxLength={inputMaxLength}
        className="w-full h-10 px-3 text-base border placeholder-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      {isMaxLengthOn && (
        <p className="text-xs text-right text-gray-500 mt-1">
          {value.length}/{inputMaxLength}
        </p>
      )}
    </div>
  );
}
