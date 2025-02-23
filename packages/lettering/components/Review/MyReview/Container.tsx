import { Box } from '@mui/material';
import HeadComponent from '../../common/HeadComponent';
import ReviewListContainer from './MyReviewListContainer';

export default function Container() {
  return (
    <Box sx={{ py: 1.5 }}>
      <Box sx={{ px: 2 }}>
        <HeadComponent isLeftButtonVisable={true} title="나의 리뷰" />
      </Box>

      <Box sx={{ px: 2 }}>
        <ReviewListContainer />
      </Box>
    </Box>
  );
}
