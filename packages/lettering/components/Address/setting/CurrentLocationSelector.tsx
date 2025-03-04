'use client';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useLocation } from './useLocation';
import LocationButton from './LocationButton';
import useDetectiveWebview from '@/config/utils/webview/useDetectiveWebview';

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
  } = useLocation(currentLocation, setCurrentLocation);

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
          <Box sx={{ height: 40, my: 1 }}>
            {!isError ? (
              !isLoading ? (
                <>
                  <Typography fontSize={14} fontWeight="bold">
                    {currentLocation}
                  </Typography>
                  <Typography fontSize={12} color="gray" mb={1}>
                    {currentLocation &&
                      '이 주소가 현재 위치가 맞다면 아래 버튼을 눌러주세요'}
                  </Typography>
                </>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress color="secondary" size={24} />
                </Box>
              )
            ) : (
              <Typography fontSize={12} color="error" mb={1}>
                {errorMessage || '주소를 찾을 수 없습니다.'}
              </Typography>
            )}
          </Box>

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
