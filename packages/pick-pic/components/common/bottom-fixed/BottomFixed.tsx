'use client';

import { globalMaxWidth } from '@/config/utils/global';

interface FixedBottomButtonProps {
  label: string;
  onClickMove?: () => void;
  isDisabled: boolean;
}

export default function BottomFixed({
  label,
  onClickMove,
  isDisabled,
}: FixedBottomButtonProps) {
  return (
    <div
      className={`
        fixed bottom-0 left-1/2 transform -translate-x-1/2 
        w-full max-w-[${globalMaxWidth}px] h-[70px] z-50 
        px-4 flex items-center justify-center
        ${isDisabled ? 'bg-gray-400 cursor-default' : 'bg-main cursor-pointer'}
      `}
      onClick={isDisabled ? undefined : onClickMove}
    >
      <p className="text-white font-bold text-lg">{label || ''}</p>
    </div>
  );
}
