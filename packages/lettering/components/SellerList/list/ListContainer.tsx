import { Box } from '@mui/material';
import SellerComponent from './SellerComponent';
import { sellerList } from './dummy';

export default function ListContainer() {
  return (
    <>
      <Box
        sx={{
          my: 2,
        }}
      >
        {/* <StoreEmptyComponent /> */}
        {sellerList.map((item, index) => (
          <Box key={item._id} sx={{ my: 4 }}>
            <SellerComponent {...item} />
          </Box>
        ))}
      </Box>
    </>
  );
}
