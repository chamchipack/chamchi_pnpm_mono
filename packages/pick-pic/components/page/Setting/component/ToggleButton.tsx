'use client';

export default function ToggleButton({
  isOn,
  onClick,
  size = 'sm',
}: {
  isOn: boolean;
  onClick: () => void;
  size?: 'sm' | 'md';
}) {
  const isSmall = size === 'sm';
  const wrapperClass = isSmall ? 'w-12 h-6' : 'w-14 h-8';
  const knobSize = isSmall ? 'w-4 h-4' : 'w-6 h-6';
  const translateX = isSmall ? 'translate-x-6' : 'translate-x-6';

  return (
    <button
      onClick={onClick}
      className={`relative ${wrapperClass} rounded-full transition-colors duration-300 ${
        isOn ? 'bg-[#e83b64]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-1 left-1 ${knobSize} rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          isOn ? translateX : ''
        }`}
      />
    </button>
  );
}
