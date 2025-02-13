import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import ReviewListContainer from './review/ReviewListContainter';

export default function Container() {
  return (
    <Box sx={{ py: 1.5 }}>
      <Box sx={{ px: 2 }}>
        <HeadComponent isButtonVisable={true} title="리뷰" />
      </Box>

      <Box sx={{ px: 2 }}>
        <ReviewListContainer score={4.6} />
      </Box>
    </Box>
  );
}
