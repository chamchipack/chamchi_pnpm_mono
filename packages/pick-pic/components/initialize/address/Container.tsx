'use client';
import SearchInput from '@/components/page/Address/components/SearchInput';
import AddressSearchList from '@/components/page/Address/search/AddressSearchList';
import CurrentLocationSelector from '@/components/page/Address/setting/CurrentLocationSelector';
import Image from 'next/image';
import { useState } from 'react';

type SearchList = {
  roadAddress: string;
  latitude: string;
  longitude: string;
};

export default function AddressContainer() {
  const [searchList, setSearchList] = useState<SearchList[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const handleRegisterAddress = () => {
    setCurrentLocation(null);

    (window as any).ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'INITIALIZE_ADDRESS',
        data: { isMarketingAlarm: checked, status: 'pass' },
      }),
    );
  };

  const handleSearchQuery = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/kakao-geocode?query=${query}`);
      const list = await response.json();
      const { documents = [] } = list;

      const addList: SearchList[] = documents.map(
        ({ x = '', y = '', address_name = '' }) => ({
          roadAddress: address_name,
          longitude: x,
          latitude: y,
        }),
      );

      setSearchList(addList);
    } catch (error) {
      console.error('API 호출 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickRegister = () => {
    const form = { isMarketingAlarm: checked, status: '' };

    (window as any).ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'INITIALIZE_ADDRESS',
        data: form,
      }),
    );
  };

  return (
    <>
      <div className="pt-4 pb-20 pt-12 h-full">
        <div className="px-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-start">환영합니다!</h1>
            <Image
              src="/logo/logo2_4x.png"
              alt="피크피크 로고"
              width={50}
              height={50}
              className="rounded-xl shadow-md"
            />
          </div>

          <p className="text-gray-700 text-start mb-4 text-sm leading-relaxed">
            피크피크의 다양한 서비스를 이용하시기 전에
            <br />
            알림 수신 여부를 선택해 주세요.
          </p>

          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <span className="text-gray-800 text-sm">
                이벤트, 할인 혜택 등 마케팅 알림 수신 동의 (선택)
              </span>
            </label>
          </div>

          <div className="my-6 border-b border-dashed border-gray-400 w-full"></div>
        </div>

        <div className="px-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-start">위치 선택</h1>
            <Image
              src="/logo/logo3_4x.png"
              alt="피크피크 로고"
              width={50}
              height={50}
              className="rounded-xl shadow-md"
            />
          </div>

          <p className="text-gray-700 text-start mb-4 text-sm leading-relaxed">
            정확한 서비스를 제공해드리기 위해 먼저 주소를 선택해 주세요.
          </p>
          <SearchInput
            isUsable={true}
            handleSearchQuery={handleSearchQuery}
            placeholder="예시) 세종대로 110, 강남구, 천안시, 성수동"
          />

          <CurrentLocationSelector
            currentLocation={currentLocation}
            handleRegisterAddress={handleRegisterAddress}
            setCurrentLocation={setCurrentLocation}
          />
          {searchList.length || currentLocation ? null : (
            <>
              {' '}
              <p className="text-xs text-gray-500 mt-2">
                - 시/군/구 예시 : 서울시, 강남구, 성수동
              </p>
              <p className="text-xs text-gray-500 mt-2">
                - 도로명 주소 예시 : 세종대로 110
              </p>
            </>
          )}
        </div>

        <div className="px-4 mt-4">
          <AddressSearchList
            searchList={searchList}
            searchQuery={searchQuery}
            isLoading={isLoading}
            onClickRegister={onClickRegister}
          />
        </div>

        {/* <button
          className={`fixed bottom-6 left-4 right-4 text-lg font-semibold py-3 rounded-xl shadow-md
    ${
      !selectedAddress?.latitude && !currentLocation
        ? 'bg-gray-300 text-gray-500'
        : 'bg-main text-white'
    }
  `}
          onClick={handleRouteNext}
          disabled={!selectedAddress?.latitude && !currentLocation}
        >
          시작하기
        </button> */}
      </div>
    </>
  );
}
