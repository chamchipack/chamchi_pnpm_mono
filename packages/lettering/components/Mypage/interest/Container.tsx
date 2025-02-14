import { Box } from '@mui/material';
import HeadComponent from '../../common/HeadComponent';
import MyInterestList from './MyInterestList';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isButtonVisable={true} title="찜 리스트" />
        </Box>

        <Box sx={{ px: 2, mt: 3 }}>
          <MyInterestList />
        </Box>
      </Box>
    </>
  );
}
