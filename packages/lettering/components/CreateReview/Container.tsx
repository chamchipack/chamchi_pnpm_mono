import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import CreationContainer from './create/CreationContainer';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isButtonVisable={true} title="리뷰 작성" />
        </Box>

        <Box sx={{ px: 2, mt: 3 }}>
            <CreationContainer />
        </Box>
      </Box>
    </>
  );
}
