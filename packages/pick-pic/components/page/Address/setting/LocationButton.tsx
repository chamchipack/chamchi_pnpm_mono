'use client';

interface LocationButtonProps {
  onClick: () => void;
  text: string;
  isError?: boolean;
  isLoading?: boolean;
}

export default function LocationButton({
  onClick,
  text,
  isError,
  isLoading,
}: LocationButtonProps) {
  const bgColor = isError
    ? 'bg-red-100'
    : isLoading
      ? 'bg-gray-300'
      : 'bg-gray-200';

  const cursor = isLoading ? 'cursor-default' : 'cursor-pointer';

  return (
    <div
      className={`${bgColor} rounded-lg text-gray-800 h-10 my-2 flex items-center justify-center text-sm ${cursor}`}
      onClick={!isLoading ? onClick : undefined}
    >
      {text}
    </div>
  );
}
