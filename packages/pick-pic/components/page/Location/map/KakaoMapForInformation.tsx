'use client';

import ErrorCommonComponent from '@/components/common/layout/error/ErrorCommonComponent';
import { useUserInfoKeys } from '@/store/userStore/state';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import ImageMarker from '../markers/ImageMarker';

interface KakaoMapForInformationProps {
  _id: string;
  lat: number;
  lng: number;
  imageSrc?: string;
  zoomLevel?: number;
}

function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getZoomLevelByDistance(distanceKm: number): number {
  if (distanceKm <= 0.5) return 4;
  if (distanceKm <= 1) return 5;
  if (distanceKm <= 3) return 6;
  if (distanceKm <= 6) return 7;
  if (distanceKm <= 10) return 8;
  if (distanceKm <= 20) return 9;
  if (distanceKm <= 40) return 10;
  if (distanceKm <= 70) return 11;
  return 12;
}

const thresholdKm = 20;

export default function KakaoMapForInformation({
  _id,
  lat,
  lng,
  imageSrc = '/cake1.png',
  zoomLevel = 5,
}: KakaoMapForInformationProps) {
  const { latitude, longitude, profile_image } = useUserInfoKeys([
    'latitude',
    'longitude',
    'profile_image',
  ]);

  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY || '',
  });

  if (error) {
    return (
      <div className="relative w-full h-full bg-gray-100">
        <ErrorCommonComponent
          title="지도정보 가져오기에 실패했습니다."
          height="100%"
          isBackwardAvailable={false}
          isSigninAvailable={false}
          isHomeRouteAvailable={false}
          isNativeStackInitialize={false}
        />
      </div>
    );
  }

  if (loading) return null;

  const userLat = latitude ? Number(latitude) : lat;
  const userLng = longitude ? Number(longitude) : lng;

  const distance = getDistanceKm(lat, lng, userLat, userLng);

  const centerLat = distance > thresholdKm ? lat : (lat + userLat) / 2;
  const centerLng = distance > thresholdKm ? lng : (lng + userLng) / 2;
  const level = getZoomLevelByDistance(distance);

  return (
    <div className="relative w-full h-full">
      <Map
        center={{ lat: centerLat, lng: centerLng }}
        style={{ width: '100%', height: '100%' }}
        level={level}
        draggable={true}
        zoomable={true}
        disableDoubleClickZoom={true}
        onClick={() => {}}
        onTouchStart={() => {}}
      >
        <ImageMarker _id={_id} lat={lat} lng={lng} imageSrc={imageSrc} />
        {latitude && longitude && (
          <ImageMarker
            _id="user"
            lat={Number(latitude)}
            lng={Number(longitude)}
            imageSrc={profile_image || '/user.png'}
          />
        )}
      </Map>
    </div>
  );
}
