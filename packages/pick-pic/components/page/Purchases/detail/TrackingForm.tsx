'use client';

import { useState } from 'react';

export default function TrackingForm({
  trackingNumber,
  parcelCompanyCode,
}: {
  trackingNumber?: string;
  parcelCompanyCode?: string;
}) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState('');

  const handleOpen = () => {
    if (!trackingNumber || !parcelCompanyCode) return;

    const url = `/api/tracking?trackingNumber=${encodeURIComponent(
      trackingNumber,
    )}&parcelCompanyCode=${encodeURIComponent(parcelCompanyCode)}`;

    setSrc(url);
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={!trackingNumber || !parcelCompanyCode}
        className="w-full my-4 rounded-lg px-4 py-1 bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        배송조회
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-[90vw] max-w-4xl h-[80vh] bg-white rounded-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-semibold">스마트택배 운송장 조회</h3>
              <button className="px-3 py-1" onClick={() => setOpen(false)}>
                닫기
              </button>
            </div>

            <iframe
              src={src}
              title="tracking"
              className="w-full h-[calc(80vh-48px)]"
              // 필요 시 sandbox 옵션 조정
              // sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      )}
    </>
  );
}
