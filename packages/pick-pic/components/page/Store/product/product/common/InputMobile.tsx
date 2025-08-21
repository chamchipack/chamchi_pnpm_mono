'use client';

interface InputMobileProps {
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  inputMaxLength?: number;
  isMaxLengthOn?: boolean;
}

export default function InputMobile({
  value,
  setValue,
  placeholder = '휴대폰 번호를 입력해주세요',
  inputMaxLength = 11,
  isMaxLengthOn = false,
}: InputMobileProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    setValue(onlyNumbers);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        inputMode="numeric"
        maxLength={inputMaxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-base"
      />
      {isMaxLengthOn && (
        <p className="text-xs text-right text-gray-500 mt-1">
          {value.length}/{inputMaxLength}
        </p>
      )}
    </div>
  );
}
