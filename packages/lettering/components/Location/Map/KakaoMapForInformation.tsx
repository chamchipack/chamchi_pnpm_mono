'use client';
import Script from 'next/script';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { Box } from '@mui/material';
import ImageMarker from '../Markers/ImageMarker';
import { useState } from 'react';
import BackDrop from '@/components/common/backdrop/BackDrop';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false`;

interface KakaoMapForInformationProps {
  _id: string;
  lat: number;
  lng: number;
  imageSrc?: string;
  zoomLevel?: number;
}

export default function KakaoMapForInformation({
  _id,
  lat,
  lng,
  imageSrc = '/cake1.png', // 기본 이미지 설정
  zoomLevel = 5, // 기본 줌 레벨 설정
}: KakaoMapForInformationProps) {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY || '',
  });

  if (error) return null;

  if (loading) return <BackDrop text="내 주변가게를 찾는 중입니다..." />;

  return (
    <>
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Map
          center={{ lat, lng }}
          style={{ width: '100%', height: '100%' }}
          level={zoomLevel}
          draggable={false} // 지도 이동 불가
          zoomable={false} // 줌 불가
          disableDoubleClickZoom={true} // 더블 클릭 줌 방지
          onClick={() => {}} // 클릭 비활성화
          onTouchStart={() => {}} // 터치 이벤트 비활성화
        >
          {/* 가게 위치를 나타내는 단 하나의 마커 */}
          <ImageMarker _id={_id} lat={lat} lng={lng} imageSrc={imageSrc} />
        </Map>
      </Box>
    </>
  );
}
