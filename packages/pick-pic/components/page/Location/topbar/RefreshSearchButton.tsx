'use client';

import useReceiveWebviewMessage from '@/config/utils/hooks/useReceiveWebviewMessage';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

export default function RefreshSearchButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  const [absoluteHeight, setAbsoluteHeight] = useState<number>(80);

  useReceiveWebviewMessage(async (data, event) => {
    setAbsoluteHeight(Number(data) + 16);
  });

  return (
    <button
      onClick={onClick}
      className="absolute left-1/2 -translate-x-1/2 z-9 flex items-center gap-1 border border-main bg-white text-black text-xs font-medium px-3 py-2 rounded-full shadow-sm hover:bg-white transition-colors"
      style={{ top: `${absoluteHeight}px` }}
    >
      <RefreshCcw size={14} className="text-black" />이 장소에서 재검색
    </button>
  );
}
