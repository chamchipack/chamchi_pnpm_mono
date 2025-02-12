import { Box, Card, CardContent, Typography } from '@mui/material';
import OrderComponent from './OrderComponent';
import OrderEmptyComponent from './OrderEmptyComponent';

export default function ListContainer() {
  return (
    <>
      <Box
        sx={{
          my: 2,
        }}
      >
        {/* <OrderEmptyComponent /> */}
        {Array.from({ length: 8 }).map((_, index) => (
          <Box key={index} sx={{ my: 4 }}>
            <OrderComponent />
          </Box>
        ))}
      </Box>
    </>
  );
}
