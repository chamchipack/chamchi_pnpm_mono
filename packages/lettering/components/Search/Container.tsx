import { Box, Divider, Typography } from '@mui/material';
import InputContainer from './search/InputContainer';
import PopularSearches from './search/PopularSearches';
import RecentSearches from './search/RecentSearches';

const keywords = [
  '아이폰 15',
  '삼성 갤럭시',
  '맥북 프로',
  'PS5',
  '닌텐도 스위치',
  '애플워치',
  '에어팟 프로',
  '갤럭시 탭',
  '아이패드',
  'LG 올레드 TV',
];

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <InputContainer
            isFilterVisable={false}
            isBackwardVisable={true}
            isTimeSelectable={true}
          />
        </Box>
        <Box sx={{ px: 2 }}>
          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography fontSize={14} fontWeight={'bold'}>
              인기 검색어 순위
            </Typography>
          </Box>

          <PopularSearches keywords={keywords} />
        </Box>
        <Box sx={{ px: 3 }}>
          <Divider />
        </Box>
        <Box sx={{ px: 2, my: 2 }}>
          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography fontSize={14} fontWeight={'bold'}>
              최근 검색어
            </Typography>
          </Box>
          <Box sx={{ px: 1 }}>
            <RecentSearches />
          </Box>
        </Box>
      </Box>
    </>
  );
}
