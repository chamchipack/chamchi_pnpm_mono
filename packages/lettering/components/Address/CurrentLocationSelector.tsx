import { Typography, Button } from '@mui/material';

interface CurrentLocationSelectorProps {
  currentLocation: string | null;
  handleFindCurrentLocation: () => void;
  handleRegisterAddress: () => void;
}

export default function CurrentLocationSelector({
  currentLocation,
  handleFindCurrentLocation,
  handleRegisterAddress,
}: CurrentLocationSelectorProps) {
  return (
    <>
      {!currentLocation && (
        <Button
          fullWidth
          sx={{ backgroundColor: '#eee', color: '#333', mb: 2, height: 40 }}
          onClick={handleFindCurrentLocation}
        >
          현재 위치로 찾기
        </Button>
      )}

      {currentLocation && (
        <>
          <Typography fontSize={14} fontWeight="bold">
            {currentLocation}
          </Typography>
          <Typography fontSize={12} color="gray" mb={1}>
            이 주소가 현재 위치가 맞다면 확인을 눌러주세요
          </Typography>
          <Button
            fullWidth
            sx={{ backgroundColor: '#eee', color: '#333', height: 40 }}
            onClick={handleRegisterAddress}
          >
            이 주소로 등록하기
          </Button>
        </>
      )}
    </>
  );
}
