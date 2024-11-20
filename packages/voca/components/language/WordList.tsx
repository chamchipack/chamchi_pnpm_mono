'use client';
import { Language } from '@/config/defaultType';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { kboFont } from 'package/styles/fonts/module';

interface Props {
  language: Language;
}

export default function WordList({ ...props }: Props) {
  const router = useRouter();
  const categories = [
    {
      label: '전체',
      target: '',
      color: (theme: any) => theme.palette.purple.light,
    },
    {
      label: '동사',
      target: 'verb',
      color: (theme: any) => theme.palette.primary.main,
    },
    {
      label: '명사',
      target: 'noun',
      color: (theme: any) => theme.palette.secondary.main,
    },
    {
      label: '형용사',
      target: 'adj',
      color: (theme: any) => theme.palette.info.main,
    },
    {
      label: '부사',
      target: 'adv',
      color: (theme: any) => theme.palette.success.main,
    },
    {
      label: '기타',
      target: 'etc',
      color: (theme: any) => theme.palette.warning.main,
    },
  ];

  return (
    <>
      <Box
        sx={{
          p: 1,
        }}
      >
        <Typography sx={{ ...kboFont }} color="text.primary">
          전체 단어 리스트 보러가기!
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around', // 시작 부분부터 정렬
          gap: 2,
          p: 2,
          overflowX: 'auto', // 가로 스크롤 허용
          width: '100%',
          paddingLeft: '16px', // 컨테이너의 좌측 여백 추가
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={category.label}
            sx={{
              cursor: 'pointer',
              backgroundColor: category.color,
              color: 'white',
              borderRadius: 2,
              minWidth: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              ml: 1,
              height: 50,
            }}
            onClick={() =>
              router.push(
                `/chamchivoca/${props?.language}/voca-list?type=${category?.target}`,
              )
            }
          >
            <Typography sx={{ ...kboFont }}>{category.label}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}
