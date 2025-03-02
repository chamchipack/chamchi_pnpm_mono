'use client';
import { handleNavigation } from '@/config/navigation';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { Box, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

interface PopularSearchesProps {
  keywords: string[];
}

const marginBottom = 1.5;

export default function PopularSearches({
  keywords = [],
}: PopularSearchesProps) {
  const router = useRouter();

  const [selectedDate] = useRecoilState(dateSelectionAtom);

  const handleRouter = (query: string) => {
    const param: { query: string; date?: Dayjs } = { query };

    if (selectedDate) {
      param.date = selectedDate;
    }

    // ✅ selectedDate가 있을 때만 `date`를 포함
    let path = `/application/seller-list?query=${query}`;
    if (selectedDate) {
      path += `&date=${selectedDate}`;
    }

    const isWebView = handleNavigation({
      path: 'seller-list',
      status: 'forward',
      params: JSON.stringify(param),
    });

    if (!isWebView) return router.push(path);
  };

  const leftList = keywords.slice(0, 5);
  const rightList = keywords.slice(5, 10);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        mx: 'auto',
        p: 1,
      }}
    >
      {/* 왼쪽 리스트 (1~5위) */}
      <Box sx={{ width: '50%', textAlign: 'left' }}>
        {leftList.map((keyword, index) => (
          <Typography
            key={index}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              mb: marginBottom,
              color: index < 3 ? 'info.main' : 'inherit', // ✅ 1~3위는 info.main 색상 적용
            }}
            onClick={() => handleRouter(keyword)}
          >
            {index + 1}. {keyword}
          </Typography>
        ))}
      </Box>

      {/* 오른쪽 리스트 (6~10위) */}
      <Box sx={{ width: '50%', textAlign: 'left' }}>
        {rightList.map((keyword, index) => (
          <Typography
            key={index}
            sx={{
              fontSize: 14,
              fontWeight: 500,
              mb: marginBottom,
              color: index + 6 <= 3 ? 'info.main' : 'inherit', // ✅ 1~3위는 info.main 색상 적용
            }}
            onClick={() => handleRouter(keyword)}
          >
            {index + 6}. {keyword}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
