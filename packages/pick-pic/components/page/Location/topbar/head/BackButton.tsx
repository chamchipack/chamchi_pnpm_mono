'use client';

import { ChevronLeft } from 'lucide-react';
import React from 'react';

interface Props {
  onClick: () => void;
}

const BackButton = ({ onClick }: Props) => {
  return (
    <div className="h-full flex items-center px-1">
      <button onClick={onClick} className="p-1" aria-label="뒤로가기 버튼">
        <ChevronLeft size={26} className="text-gray-800" />
      </button>
    </div>
  );
};

export default React.memo(BackButton);
