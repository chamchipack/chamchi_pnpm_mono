import { Box } from '@mui/material';

export default function StoreMainImage() {
  return (
    <Box
      component="img"
      src="/cake1.png"
      alt="Cake Image"
      sx={{
        width: '100%',
        height: 250,
        objectFit: 'cover',
      }}
    />
  );
}
