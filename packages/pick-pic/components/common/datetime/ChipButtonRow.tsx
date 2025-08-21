'use client';

import React, { useState } from 'react';

interface Props {
  setTimeRange: ({ start, end }: { start: string; end: string }) => void;
  setSelectedTime: (data: string) => void;
}

const ChipButtonRow = ({ setTimeRange, setSelectedTime }: Props) => {
  const [selectedLabel, setSelectedLabel] = useState<'오전' | '오후'>('오후');

  const handleClick = (label: '오전' | '오후') => {
    setSelectedLabel(label);
    setSelectedTime('');
    if (label === '오전') {
      setTimeRange({ start: '09:00', end: '14:00' });
    } else {
      setTimeRange({ start: '14:00', end: '21:30' });
    }
  };

  return (
    <div className="flex flex-row gap-3">
      {(['오전', '오후'] as const).map((label) => (
        <button
          key={label}
          onClick={() => handleClick(label)}
          className={`px-4 py-1 rounded-full font-bold text-sm transition-colors ${
            selectedLabel === label
              ? 'bg-main text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default React.memo(ChipButtonRow);
