'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

const NAVER_CLIENT_ID = ''; // 네이버 지도 API Client ID

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markerInstance = useRef<naver.maps.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.naver || !window.naver.maps) return;

    const { Map, LatLng, Marker, Point } = window.naver.maps;

    const map = new Map(mapRef.current, {
      center: new LatLng(37.5665, 126.978), // 서울 시청 좌표
      zoom: 14,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
      mapTypeControl: true,
    });

    mapInstance.current = map;

    // ✅ 커스텀 마커: 흰색 박스 추가
    const marker = new Marker({
      position: new LatLng(37.5665, 126.978),
      map,
      title: '커스텀 마커',
      icon: {
        content: `
          <div style="
            width: 50px;
            height: 50px;
            background-color: white;
            border: 2px solid black;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
          ">
            박스
          </div>
        `,
        anchor: new Point(25, 25),
      },
    });

    markerInstance.current = marker;

    // ✅ Cleanup (컴포넌트가 언마운트될 때 실행)
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy(); // 지도 인스턴스 제거
      }
      if (markerInstance.current) {
        markerInstance.current.setMap(null); // 마커 제거
      }
    };
  }, []);

  return (
    <>
      <Script
        strategy="beforeInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}`}
      />
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
    </>
  );
};

export default NaverMap;
