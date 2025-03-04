import { useEffect, useState } from 'react';
import { handleFindLocation, handleStorage } from '@/config/navigation';
import { useRecoilState } from 'recoil';
import { UserInfoAtom } from '@/store/userStore/state';

type AddressListType = {
  address: string;
  longitude: string;
  latitude: string;
};

export function useLocation(
  currentLocation: string | null,
  setCurrentLocation: (name: string) => void,
) {
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const [findMode, setFindMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState({
    longitude: 126.914562,
    latitude: 35.130445,
  });

  const handleFindCurrentLocation = () => {
    setFindMode(true);
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);
    // callApi();

    const isWebView = handleFindLocation({ data: 'find-location' });

    if (!isWebView) {
      setErrorMessage('위치 정보를 가져올 수 없습니다.');
      setIsLoading(false);
      setFindMode(false);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent<string>) => {
      try {
        const position = JSON.parse(event.data);
        if (!position?.longitude || !position?.latitude) {
          setErrorMessage('위치 정보를 가져올 수 없습니다.');
          setIsError(true);
        }

        setCurrentPosition({
          longitude: position.longitude,
          latitude: position.latitude,
        });

        setTimeout(() => callApi(position.longitude, position.latitude), 1000);
      } catch (error) {
        (window as any).ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: 'ETC',
            data: 'errr',
          }),
        );
        setErrorMessage('위치 정보를 가져올 수 없습니다.');
        console.error('❌ 메시지 처리 오류:', error);
        setIsError(true);
        setErrorMessage('위치 데이터를 처리하는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const callApi = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
        `/api/reverse-kakao-geocode?lat=${lat}&lng=${lng}`,
      );
      const result = await response.json();

      if (!response.ok || result.error)
        throw new Error(result.error || '주소 변환 실패');

      const { documents = [] } = result;
      const { address = {} } = documents[0];

      // const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lng}`);
      // const data = await res.json();

      // if (!res.ok || data.error)
      //   throw new Error(data.error || '주소 변환 실패');

      // const array = data?.results || [];

      if (documents.length) {
        // const { region = {} } =
        //   array.find(({ name = '' }) => name === 'roadaddr') || {};
        // const a = region['area1']?.name || '';
        // const b = region['area2']?.name || '';
        // const c = region['area3']?.name || '';
        // const rs = `${a} ${b} ${c}`;

        const depth1 = address['region_1depth_name'] || '';
        const depth2 = address['region_2depth_name'] || '';
        const depth3 = address['region_3depth_name'] || '';

        const region = `${depth1} ${depth2} ${depth3}`;

        setCurrentLocation(region);
        setIsLoading(false);
      } else {
        setIsError(true);
        setErrorMessage('주소 데이터를 찾을 수 없습니다');
        setIsLoading(false);
        // throw new Error('주소 데이터를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      setIsError(true);
      setErrorMessage('위치 정보를 불러오는 중 문제가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const handleSaveLocation = () => {
    if (!currentLocation || isLoading || isError) return;

    try {
      const list = userInfo.location_list;
      const dataset = {
        address: currentLocation,
        longitude: currentPosition.longitude.toString(),
        latitude: currentPosition.latitude.toString(),
      };

      const form = [...(list || []), dataset];

      const data = {
        multiple: true,
        data: [
          { key: 'latitude', name: currentPosition.latitude },
          { key: 'longitude', name: currentPosition.longitude },
          { key: 'address', name: currentLocation },
          { key: 'location_list', name: form },
        ],
      };

      setUserInfo((prev) => ({
        ...prev,
        address: currentLocation,
        longitude: currentPosition.longitude.toString(),
        latitude: currentPosition.latitude.toString(),
        location_list: form,
      }));

      handleStorage({ data });
      setFindMode(false);
    } catch {}
  };

  return {
    findMode,
    isLoading,
    isError,
    errorMessage,
    currentPosition,
    handleFindCurrentLocation,
    handleSaveLocation,
  };
}
