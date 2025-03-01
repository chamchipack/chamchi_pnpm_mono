import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import ReviewListContainer from './review/ReviewListContainter';

interface Props {
  sellerId: string;
}

export default function Container({ sellerId = '' }: Props) {
  return (
    <Box sx={{ py: 1.5 }}>
      <Box sx={{ px: 2 }}>
        <HeadComponent isLeftButtonVisable={true} title="리뷰" />
      </Box>

      <Box sx={{ px: 2 }}>
        <ReviewListContainer score={4.6} />
      </Box>
    </Box>
  );
}
