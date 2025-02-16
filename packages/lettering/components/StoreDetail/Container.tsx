import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import StoreMainImage from './store/\bStoreMainImage';
import StoreContainer from './store/StoreContainer';
import StoreItemPictures from './store/StoreItemPictures';

export default function Container() {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent isButtonVisable={true} title="스타벅스 강남점" />
        </Box>

        <Box sx={{}}>
          <StoreMainImage />
        </Box>
        <Box sx={{ px: 2, mt: 1 }}>
          <StoreContainer />
        </Box>

        <Box sx={{ mt: 2 }}>
          <StoreItemPictures />
        </Box>
      </Box>
    </>
  );
}
