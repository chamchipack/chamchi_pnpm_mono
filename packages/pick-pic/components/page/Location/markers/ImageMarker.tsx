'use client';

import React from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

interface ImageMarkerProps {
  _id: string;
  lat: number;
  lng: number;
  imageSrc?: string;
  onClick?: (_id: string) => void;
}

const ImageMarker = ({
  _id,
  lat,
  lng,
  imageSrc = '/cake1.png',
  onClick,
}: ImageMarkerProps) => {
  return (
    <CustomOverlayMap position={{ lat, lng }}>
      <div
        onClick={() => onClick && onClick(_id)}
        className="w-10 h-10 bg-white border-2 border-pink-500 rounded-full shadow-md overflow-hidden cursor-pointer flex items-center justify-center"
      >
        <img
          src={imageSrc}
          alt="커스텀 마커"
          className="w-full h-full object-cover"
        />
      </div>
    </CustomOverlayMap>
  );
};

export default React.memo(ImageMarker);
