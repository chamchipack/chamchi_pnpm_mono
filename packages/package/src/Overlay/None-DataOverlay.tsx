import { Box, Typography } from '@mui/material';

export default function NoneDataOverlay({ ...props }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: props?.height || 50,
        background: '#e2e2e2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        ...props,
      }}
    >
      <Typography color="text.secondary">조회된 데이터가 없어요!</Typography>
    </Box>
  );
}
