'use client';

import React from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface CustomNoneSelectedMarkerProps {
  _id: string;
  lat: number;
  lng: number;
  imageSrc?: string;
  onClick?: (_id: string) => void;
}

const CustomNoneSelectedMarker = ({
  _id,
  lat,
  lng,
  imageSrc = '/cake1.png',
  onClick,
}: CustomNoneSelectedMarkerProps) => {
  return (
    <CustomOverlayMap position={{ lat, lng }} xAnchor={0.5} yAnchor={1}>
      <div
        onClick={() => onClick && onClick(_id)}
        className="relative flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow cursor-pointer"
      >
        {/* 테두리용 삼각형 (뒤) */}
        <div className="absolute left-1/2 bottom-[-11px] -translate-x-1/2 w-0 h-0 border-l-[11px] border-r-[11px] border-t-[11px] border-transparent border-t-gray-300 z-10" />
        {/* 흰색 삼각형 (앞) */}
        <div className="absolute left-1/2 bottom-[-10px] -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-white z-20" />

        <img
          src={imageSrc}
          alt="커스텀 마커"
          className="w-[30px] h-[30px] rounded-full object-cover"
        />
        <span className="text-sm font-bold text-black whitespace-nowrap">
          케이크 가게
        </span>
      </div>
    </CustomOverlayMap>
  );
};

export default React.memo(CustomNoneSelectedMarker);
