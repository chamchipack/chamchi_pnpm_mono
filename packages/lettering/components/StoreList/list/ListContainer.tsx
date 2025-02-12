import { Box, Card, CardContent, Typography } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import StoreComponent from './StoreComponent';
import StoreEmptyComponent from './StoreEmptyComponent';

export default function ListContainer() {
  return (
    <>
      <Box
        sx={{
          my: 2,
        }}
      >
        <StoreEmptyComponent />
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index} sx={{ my: 4 }}>
            <StoreComponent />
          </Box>
        ))}
      </Box>
    </>
  );
}
