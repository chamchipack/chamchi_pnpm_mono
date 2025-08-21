'use client';

import React from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface CustomSelectedMarkerProps {
  _id: string;
  lat: number;
  lng: number;
  imageSrc?: string;
  name: string;
  onClick?: (_id: string) => void;
}

const CustomSelectedMarker = ({
  _id,
  lat,
  lng,
  imageSrc = '/cake1.png',
  onClick,
  name,
}: CustomSelectedMarkerProps) => {
  return (
    <CustomOverlayMap position={{ lat, lng }} xAnchor={0.5} yAnchor={1}>
      <div
        onClick={() => onClick && onClick(_id)}
        className="min-w-[120px] max-w-[340px] relative flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-2xl shadow-md cursor-pointer break-words"
      >
        {/* 말풍선 아래 삼각형 (테두리용) */}
        <div className="absolute left-1/2 bottom-[-14px] -translate-x-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[14px] border-transparent border-t-black z-10" />
        {/* 말풍선 아래 삼각형 (안쪽 하얀색) */}
        <div className="absolute left-1/2 bottom-[-12px] -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-transparent border-t-white z-20" />

        <img
          src={imageSrc}
          alt="커스텀 마커"
          className="w-[30px] h-[30px] rounded-full object-cover flex-shrink-0"
        />
        <span className="text-sm font-bold text-black break-words">{name}</span>
      </div>
    </CustomOverlayMap>
  );
};

export default React.memo(CustomSelectedMarker);
