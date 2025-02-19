import { handleFindLocation, handleStorage } from '@/config/navigation';
import { Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';

interface CurrentLocationSelectorProps {
  currentLocation: string | null;
  handleRegisterAddress: () => void;
  setCurrentLocation: (name: string) => void;
}

export default function CurrentLocationSelector({
  currentLocation,
  handleRegisterAddress,
  setCurrentLocation,
}: CurrentLocationSelectorProps) {
  const [editMode, setEditMode] = useState({
    longitude: 126.914562,
    latitude: 35.130445,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('none');

  const handleFindCurrentLocation = () => {
    setIsLoading(true);

    const isWebView = handleFindLocation({ data: 'find-location' });
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent<string>) => {
      try {
        console.log('📩 WebView에서 받은 메시지:', event.data);
        const position = JSON.parse(event.data);
        setEditMode({
          longitude: position.longitude,
          latitude: position.latitude,
        });

        callApi(position.longitude, position.latitude);
        //event.data에 담겨있음

        // (window as any).ReactNativeWebView?.postMessage(
        //   JSON.stringify({
        //     type: 'ETC',
        //     data: event.data,
        //   }),
        // );
      } catch (error) {
        console.error('❌ 메시지 처리 오류:', error);
        (window as any).ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: 'ETC',
            data: 'error',
          }),
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const callApi = async (lng: number, lat: number) => {
    try {
      const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data.error) {
        console.error('주소 변환 실패:', data.error);
      } else {
        const array = data?.results || [];

        if (array.length) {
          const { region = {} } = array.find(
            ({ name = '' }) => name === 'roadaddr',
          );
          const a = region['area1']?.name || '';
          const b = region['area2']?.name || '';
          const c = region['area3']?.name || '';
          const rs = `${a} ${b} ${c}`;
          setCurrentLocation(rs);
        }
        // setAddress(data);
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      setIsLoading(false);
    }
  };

  const handleSaveLocation = () => {
    setIsLoading(false);

    const data = {
      multiple: true,
      data: [
        { key: 'latitude', name: editMode.latitude },
        { key: 'longitude', name: editMode.longitude },
        { key: 'address', name: currentLocation },
      ],
    };
    handleStorage({ data });
  };

  return (
    <>
      {!isLoading && (
        <Button
          fullWidth
          sx={{ backgroundColor: '#eee', color: '#333', mb: 2, height: 40 }}
          onClick={handleFindCurrentLocation}
        >
          현재 위치로 찾기
        </Button>
      )}

      {isLoading && (
        <>
          <Typography fontSize={14} fontWeight="bold">
            {currentLocation}
          </Typography>
          <Typography fontSize={12} color="gray" mb={1}>
            이 주소가 현재 위치가 맞다면 아래 버튼을 눌러주세요
          </Typography>
          <Button
            fullWidth
            sx={{ backgroundColor: '#eee', color: '#333', height: 40 }}
            onClick={handleSaveLocation}
          >
            이 주소로 등록하기
          </Button>
        </>
      )}
    </>
  );
}
