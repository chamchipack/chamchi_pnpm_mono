'use client';

import React from 'react';

interface DividerCommonBoxProps {
  height?: number; // px 단위
  my?: number; // Tailwind spacing 단위
  mt?: number;
  mb?: number;
}

const DividerBox = ({ height = 10, my, mt, mb }: DividerCommonBoxProps) => {
  const spacingClass = [
    my !== undefined ? `my-${my}` : '',
    mt !== undefined ? `mt-${mt}` : '',
    mb !== undefined ? `mb-${mb}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`bg-light-background w-full ${spacingClass}`}
      style={{ height }}
    />
  );
};
export default React.memo(DividerBox);
