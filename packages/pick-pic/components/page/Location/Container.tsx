'use client';

import { useSellersLocation } from '@/api/client/seller';
import ErrorCommonComponent from '@/components/common/layout/error/ErrorCommonComponent';
import ListToggleButton from '@/components/page/Location/Bottom/ListToggleButton';
import ListDrawerHeader from '@/components/page/Location/drawer/ListDrawerHeader';
import SelectionPreview from '@/components/page/Location/drawer/SelectionPreview';
import SellerDrawerList from '@/components/page/Location/drawer/SellerDrawerList';
import CustomNoneSelectedMarker from '@/components/page/Location/markers/CustomNoneSelectedMarker';
import CustomSelectedMarker from '@/components/page/Location/markers/CustomSelectedMarker';
import ImageMarker from '@/components/page/Location/markers/ImageMarker';
import MapHeadContainer from '@/components/page/Location/topbar/MapHeadContainer';
import RefreshSearchButton from '@/components/page/Location/topbar/RefreshSearchButton';
import { globalMaxWidth } from '@/config/utils/global';
import { useUserInfoKeys } from '@/store/userStore/state';
import { DataStructureKey } from '@/types/schema/default';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';

const PIE = (level: number) => (level > 8 ? level * 2 : level);

export type LocationSellerPick =
  | '_id'
  | 'alias'
  | 'images'
  | 'location'
  | 'marketName'
  | 'lat'
  | 'lng'
  | 'operatingDays'
  | 'minimumReservationDate'
  | 'rating'
  | 'reviewCount';

export default function Container() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY || '',
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [selectedMarker, setSelectedMarker] = useState<Pick<
    SellerSchema,
    LocationSellerPick
  > | null>(null);

  const urlLat = searchParams.get('lat');
  const urlLng = searchParams.get('lng');
  const urlLevel = searchParams.get('level');

  const { latitude, longitude } = useUserInfoKeys(['latitude', 'longitude']);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 지도 객체 ref
  const mapRef = useRef<any>(null);

  // ✅ API 호출용 상태
  const [position, setPosition] = useState(() => ({
    lat: parseFloat(urlLat || '') || parseFloat(latitude || '') || 37.5665,
    lng: parseFloat(urlLng || '') || parseFloat(longitude || '') || 126.978,
    level: parseInt(urlLevel || '') || 5,
  }));

  // ✅ 지도 중심 조작용 상태
  const [mapCenter, setMapCenter] = useState({
    lat: position.lat,
    lng: position.lng,
  });
  const [mapLevel, setMapLevel] = useState(position.level);

  // ✅ API 요청 필터
  const filter = useMemo(
    () => ({
      lat: position.lat,
      lng: position.lng,
      level: PIE(position.level),
    }),
    [position],
  );

  const { data, isValidating, mutate } = useSellersLocation<
    DataStructureKey.seller,
    'Pick',
    LocationSellerPick
  >({
    ...filter,
    field:
      'alias,images,location,marketName,rating,reviewCount,bookmarkCount,lat,lng,operatingDays,minimumReservationDate',
  });

  const items = data?.data || [];

  // ✅ 새로고침 버튼 (맵 기준 → API 위치 반영)
  const handleRefresh = () => {
    const map = mapRef.current;
    if (map) {
      setIsRefreshing(true); // 👈 로딩 시작
      const center = map.getCenter();
      const level = map.getLevel();

      const lat = center.getLat();
      const lng = center.getLng();

      setMapCenter({ lat, lng });
      setMapLevel(level);
      setPosition({ lat, lng, level });

      router.replace(
        `?lat=${lat.toFixed(6)}&lng=${lng.toFixed(6)}&level=${level}`,
      );

      setTimeout(() => {
        setIsRefreshing(false); // 👈 1초 후 로딩 종료
      }, 1000);
    }
  };

  // ✅ 헤더에서 위치 변경 시
  const handleMoveTo = (lat: number, lng: number) => {
    const newCenter = { lat, lng };
    const newLevel = 5;

    setMapCenter(newCenter);
    setMapLevel(newLevel);

    if (mapRef.current) {
      mapRef.current.setCenter(new window.kakao.maps.LatLng(lat, lng));
      mapRef.current.setLevel(newLevel);
    }

    setPosition({ lat, lng, level: newLevel });

    router.replace(
      `?lat=${lat.toFixed(6)}&lng=${lng.toFixed(6)}&level=${newLevel}`,
    );
  };

  // ✅ 선택된 마커가 있으면 드로어에서 해당 항목으로 스크롤
  useEffect(() => {
    if (drawerOpen && selectedMarker) {
      setTimeout(() => {
        const target = itemRefs.current[selectedMarker._id];
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedMarker, drawerOpen]);

  if (loading) return null;

  if (error) {
    return (
      <div className="relative w-full h-screen">
        <MapHeadContainer onClick={handleMoveTo} />
        <ErrorCommonComponent
          title="지도정보 가져오기에 실패했습니다."
          height="60%"
          isBackwardAvailable={false}
          isSigninAvailable={false}
          isHomeRouteAvailable={false}
          isNativeStackInitialize={false}
        />
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {isRefreshing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm">검색중입니다...</p>
        </div>
      )}

      <MapHeadContainer onClick={handleMoveTo} />

      <RefreshSearchButton onClick={handleRefresh} />

      <ListToggleButton
        itemCount={items.length}
        onClick={() => setDrawerOpen(true)}
      />

      <Map
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        center={mapCenter}
        onClick={() => setSelectedMarker(null)}
        level={mapLevel}
        minLevel={10}
        isPanto
      >
        {items.map((marker) => {
          if (selectedMarker?._id === marker._id) {
            return (
              <CustomSelectedMarker
                key={marker._id}
                _id={marker._id}
                lat={marker.lat}
                lng={marker.lng}
                name={marker.marketName}
                imageSrc={marker.images[0]}
              />
            );
          }

          if (mapLevel >= 3) {
            return (
              <ImageMarker
                key={marker._id}
                _id={marker._id}
                lat={marker.lat}
                lng={marker.lng}
                imageSrc={marker.images[0]}
                onClick={() => {
                  setSelectedMarker(marker);
                  setMapCenter({ lat: marker.lat, lng: marker.lng });
                }}
              />
            );
          }

          return (
            <CustomNoneSelectedMarker
              key={marker._id}
              _id={marker._id}
              lat={marker.lat}
              lng={marker.lng}
              imageSrc={marker.images[0]}
              onClick={() => setSelectedMarker(marker)}
            />
          );
        })}
      </Map>

      {selectedMarker && !drawerOpen && (
        <SelectionPreview selectedMarker={selectedMarker} />
      )}

      <div
        className={`
          fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full
          max-w-[${globalMaxWidth}px] transition-[height] duration-300
          bg-white rounded-t-2xl z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]
          flex flex-col overflow-hidden z-30
          ${drawerOpen ? 'h-[75%]' : 'h-0'}
        `}
      >
        <ListDrawerHeader
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          clearSelection={() => setSelectedMarker(null)}
        />

        {drawerOpen && (
          <SellerDrawerList
            items={items}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            itemRefs={itemRefs}
            setCenter={(center) => {
              setMapCenter(center);
              if (mapRef.current) {
                mapRef.current.setCenter(
                  new window.kakao.maps.LatLng(center.lat, center.lng),
                );
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
