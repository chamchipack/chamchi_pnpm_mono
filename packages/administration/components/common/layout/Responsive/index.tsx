import React from 'react';

interface ResponsiveProps {
  mobile: React.ReactNode; // 480px 이하
  desktop: React.ReactNode; // 481px 이상
}

export default function Responsive({ mobile, desktop }: ResponsiveProps) {
  return (
    <>
      {/* 480px 이하 */}
      <div className="block min-[481px]:hidden">{mobile}</div>

      {/* 481px 이상 */}
      <div className="hidden min-[481px]:block">{desktop}</div>
    </>
  );
}
