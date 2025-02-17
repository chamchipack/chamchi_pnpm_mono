import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2.5 }}>
          <HeadComponent isButtonVisable={true} title="약관 및 정책" />
        </Box>

        <Box sx={{ px: 2 }}></Box>
      </Box>
    </>
  );
}
