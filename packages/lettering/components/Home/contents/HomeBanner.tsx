import { Box } from '@mui/material';

const url = '/banner-test.png';
export default function HomeBanner() {
  return (
    <Box
      sx={{
        height: 140,
        backgroundColor: 'info.main', // 기본 배경색 (이미지 로드 실패 대비)
        backgroundImage: `url(${url})`, // ✅ 배경 이미지 적용
        backgroundSize: 'cover', // ✅ 이미지를 요소에 꽉 차게
        backgroundPosition: 'center', // ✅ 이미지 중앙 정렬
        backgroundRepeat: 'no-repeat', // ✅ 반복 방지
      }}
    />
  );
}
