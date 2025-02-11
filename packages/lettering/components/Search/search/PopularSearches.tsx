import { Box, Typography } from '@mui/material';

interface PopularSearchesProps {
  keywords: string[];
}

const marginBottom = 1.5;

export default function PopularSearches({
  keywords = [],
}: PopularSearchesProps) {
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
          >
            {index + 6}. {keyword}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
