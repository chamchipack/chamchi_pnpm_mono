import { Box, Divider, Typography } from '@mui/material';
import InputContainer from './search/InputContainer';
import PopularSearches from './search/PopularSearches';
import RecentSearches from './search/RecentSearches';

const keywords = [
  '레터링 케이크 주문',
  '생일 레터링 케이크',
  '맞춤 제작 케이크',
  '미니 레터링 케이크',
  '이벤트 케이크 디자인',
  '서울 레터링 케이크 맛집',
  '웨딩 레터링 케이크',
  '케이크 문구 추천',
  '캐릭터 레터링 케이크',
  '심플한 레터링 케이크 디자인',
];

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5, pb: 10 }}>
        <Box sx={{ px: 2 }}>
          <InputContainer
            isFilterVisable={false}
            isBackwardVisable={false}
            isTimeSelectable={true}
            placeholder="가게 이름이나 주소를 입력해보세요!"
          />
        </Box>
        <Box sx={{ px: 2 }}>
          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography variant="subtitle2">인기 검색어 순위</Typography>
          </Box>

          <PopularSearches keywords={keywords} />
        </Box>
        <Box sx={{ px: 3 }}>
          <Divider />
        </Box>
        <Box sx={{ px: 2, my: 2 }}>
          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography variant="subtitle2">
              최근 검색어
              <Typography component={'span'} variant="caption" sx={{ ml: 1 }}>
                최대 10개까지 저장됩니다
              </Typography>
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
