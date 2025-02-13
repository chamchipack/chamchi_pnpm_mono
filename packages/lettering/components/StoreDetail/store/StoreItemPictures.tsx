import { Box } from '@mui/material';

const dummyImages = Array.from({ length: 20 }, (_, index) =>
  index % 2 === 0 ? '/cake1.png' : '/cake2.png',
);

export default function StoreItemPictures() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // ✅ 3열 배열
        width: '100%',
      }}
    >
      {dummyImages.map((src, index) => (
        <Box
          key={index}
          component="img"
          src={src}
          alt={`Cake ${index + 1}`}
          sx={{
            width: '100%', // ✅ 그리드 셀을 꽉 채우도록 설정
            height: 120, // ✅ 고정 높이 설정 (필요시 조절 가능)
            objectFit: 'cover', // ✅ 이미지 꽉 채우기
            transition: 'opacity 0.2s ease-in-out',
            '&:hover': {
              cursor: 'pointer', // ✅ 마우스 커서를 포인터로 변경 (클릭 가능 UI)
              opacity: 0.8, // ✅ 호버 시 약간 어두워짐 (피드백 효과)
            },
          }}
        />
      ))}
    </Box>
  );
}
