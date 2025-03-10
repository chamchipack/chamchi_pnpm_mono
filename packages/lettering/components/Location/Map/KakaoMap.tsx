'use client';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ImageMarker from '../Markers/ImageMarker';
import CustomNoneSelectedMarker from '../Markers/CustomNoneSelectedMarker';
import CustomSelectedMarker from '../Markers/CustomSelectedMarker';
import SelectionBox from '../Selection/SelectionBox';
import { useRecoilValue } from 'recoil';
import { UserInfoAtom } from '@/store/userStore/state';
import { dummy, generateNearbyMarkers } from './for-test/generateNearbyMarkers';
import BackDrop from '@/components/common/backdrop/BackDrop';
import Container from './Topbar/Container';
import ErrorPage from '@/components/Error/ErrorPage';

// const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false`;

type MarkersDummy = {
  _id: string;
  name: string;
  longitude: number;
  latitude: number;
};

const KakaoMap = () => {
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

      // 테스트용 마커
      const nearbyMarkers = generateNearbyMarkers(
        Number(location.latitude),
        Number(location.longitude),
      );
      setMarkers([...dummy, ...nearbyMarkers]);
    }
  }, [location]);

  const handleMapClick = () => {
    setSelectedMarker(null); // 맵 빈 곳 클릭 시 선택 해제
  };

  const selectedMarkerData = dummy.find(
    (marker) => marker._id === selectedMarker,
  );

  if (error) {
    return (
      <ErrorPage title="지도정보 가져오기에 실패했습니다." />
      // <Box
      //   sx={{
      //     position: 'relative',
      //     width: '100%',
      //     height: '100%',
      //     background: 'gray',
      //   }}
      // >
      //   <Container />
      //   <SelectionBox
      //     selectedMarker={selectedMarker}
      //     onClose={() => setSelectedMarker(null)}
      //     markerName={selectedMarkerData?.name}
      //   />
      // </Box>
    );
  }

  if (loading) {
    return <BackDrop text="내 주변가게를 찾는 중입니다..." />;
  }

  return (
    <>
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Container />
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
        {/* {selectedMarker && ( */}
        <SelectionBox
          selectedMarker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
          markerName={selectedMarkerData?.name}
        />
        {/* )} */}
      </Box>
    </>
  );
};

export default KakaoMap;
