'use client';
import Script from 'next/script';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import ImageMarker from '../Markers/ImageMarker';
import CustomNoneSelectedMarker from '../Markers/CustomNoneSelectedMarker';
import CustomSelectedMarker from '../Markers/CustomSelectedMarker';
import SelectionBox from '../Selection/SelectionBox';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '@/store/userStore/state';

// const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false`;

const generateNearbyMarkers = (
  latitude: number,
  longitude: number,
  count = 4,
): MarkersDummy[] => {
  const offset = 0.001; // 마커를 조금씩 떨어뜨리기 위한 값 (약 100m)

  return [
    {
      _id: 'marker1',
      name: '주변 마커 1',
      latitude: latitude + offset,
      longitude: longitude + offset,
    },
    {
      _id: 'marker2',
      name: '주변 마커 2',
      latitude: latitude - offset,
      longitude: longitude + offset,
    },
    {
      _id: 'marker3',
      name: '주변 마커 3',
      latitude: latitude + offset,
      longitude: longitude - offset,
    },
    {
      _id: 'marker4',
      name: '주변 마커 4',
      latitude: latitude - offset,
      longitude: longitude - offset,
    },
  ];
};

export const dummy: MarkersDummy[] = [
  {
    _id: 'id1',
    name: '세븐일레븐',
    longitude: 127.128146,
    latitude: 37.440048249,
  },
  { _id: 'id2', name: 'GS25', longitude: 127.1272, latitude: 37.4401 },
  {
    _id: 'id3',
    name: '배스킨라빈스',
    longitude: 127.12852,
    latitude: 37.44016,
  },
  { _id: 'id4', name: '핑크네일', longitude: 127.12802, latitude: 37.44053 },
  { _id: 'id5', name: '잠실역', longitude: 127.102387, latitude: 37.513442 },
];

type MarkersDummy = {
  _id: string;
  name: string;
  longitude: number;
  latitude: number;
};

const KakaoMap = () => {
  const [loaded, setLoaded] = useState(false);
  const location = useRecoilValue(UserInfoAtom);
  const [zoomLevel, setZoomLevel] = useState(5); // 현재 줌 상태
  const [initialPosition, setInitialPosition] = useState({
    latitude: 37.439811,
    longitude: 127.12798,
  });
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null); // 선택된 마커 ID
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY || '',
  });

  const [markers, setMarkers] = useState<MarkersDummy[]>(dummy);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      setInitialPosition({
        latitude: Number(location.latitude),
        longitude: Number(location.longitude),
      });

      // 현재 위치를 기준으로 주변 마커 생성
      const nearbyMarkers = generateNearbyMarkers(
        Number(location.latitude),
        Number(location.longitude),
      );
      setMarkers([...dummy, ...nearbyMarkers]); // 기존 마커 + 새 마커 추가
    }
  }, [location]);

  const handleMapClick = () => {
    setSelectedMarker(null); // 맵 빈 곳 클릭 시 선택 해제
  };

  const selectedMarkerData = dummy.find(
    (marker) => marker._id === selectedMarker,
  );

  if (error) {
    throw new Error('카카오 API Error');
  }

  if (loading) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={true} // 로딩 중일 때 Backdrop 표시
      >
        <CircularProgress color="inherit" />
        <Typography variant="subtitle2" sx={{ color: 'white', mt: 2 }}>
          내 주변가게를 찾는 중입니다...
        </Typography>
      </Backdrop>
    );
  }

  return (
    <>
      {/* <Script
        src={KAKAO_SDK_URL}
        onLoad={() => {
          if (kakao) {
            console.log('있어');
          } else {
            console.log('없어');
          }
          kakao.maps.load(() => {
            setLoaded(true);
          });
        }}
      /> */}

      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Map
          center={{
            lat: initialPosition.latitude,
            lng: initialPosition.longitude,
          }}
          style={{ width: '100%', height: '100%' }}
          level={zoomLevel}
          onZoomChanged={(map) => setZoomLevel(map.getLevel())} // 줌 변경 감지
          onClick={handleMapClick} // 맵 빈 곳 클릭 시 선택 해제
        >
          {markers.map((marker) => {
            if (selectedMarker === marker._id) {
              return (
                <CustomSelectedMarker
                  key={marker._id}
                  _id={marker._id}
                  lat={marker.latitude}
                  lng={marker.longitude}
                />
              );
            }

            if (zoomLevel >= 3) {
              return (
                <ImageMarker
                  key={marker._id}
                  _id={marker._id}
                  lat={marker.latitude}
                  lng={marker.longitude}
                  onClick={() => setSelectedMarker(marker._id)}
                />
              );
            }

            return (
              <CustomNoneSelectedMarker
                key={marker._id}
                _id={marker._id}
                lat={marker.latitude}
                lng={marker.longitude}
                onClick={() => setSelectedMarker(marker._id)}
              />
            );
          })}
        </Map>

        {/* 선택된 마커가 있으면 하단에 Box 표시 */}
        {selectedMarker && (
          <SelectionBox
            selectedMarker={selectedMarker}
            onClose={() => setSelectedMarker(null)}
            markerName={selectedMarkerData?.name}
          />
        )}
      </Box>
    </>
  );
};

export default KakaoMap;
