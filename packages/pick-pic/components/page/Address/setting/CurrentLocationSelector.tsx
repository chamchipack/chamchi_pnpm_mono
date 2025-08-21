'use client';

import useDetectiveWebview from '@/config/utils/webview/useDetectiveWebview';
import { useLocation } from './hook/useLocation';
import LocationButton from './LocationButton';

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
  const {
    findMode,
    isLoading,
    isError,
    errorMessage,
    currentPosition,
    handleFindCurrentLocation,
    handleSaveLocation,
  } = useLocation(currentLocation, setCurrentLocation, handleRegisterAddress);

  const isWebview = useDetectiveWebview();

  if (!isWebview) return null;

  return (
    <>
      {!findMode && (
        <LocationButton
          onClick={handleFindCurrentLocation}
          text="현재 위치로 찾기"
        />
      )}

      {findMode && (
        <>
          <div className="h-10 my-2 text-sm">
            {!isError ? (
              !isLoading ? (
                <>
                  <p className="text-sm font-bold">{currentLocation}</p>
                  {currentLocation && (
                    <p className="text-xs text-gray-500 mb-1">
                      이 주소가 현재 위치가 맞다면 아래 버튼을 눌러주세요
                    </p>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <svg
                    className="animate-spin h-6 w-6 text-purple-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                </div>
              )
            ) : (
              <p className="text-xs text-red-500 mb-1">
                {errorMessage || '주소를 찾을 수 없습니다.'}
              </p>
            )}
          </div>

          <LocationButton
            onClick={isError ? handleFindCurrentLocation : handleSaveLocation}
            text={
              isError
                ? '다시 시도하기'
                : isLoading
                  ? '주소 확인 중...'
                  : '이 주소로 등록하기'
            }
            isError={isError}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
}
