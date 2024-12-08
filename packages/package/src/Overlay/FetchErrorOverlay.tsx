import { Box, Typography } from '@mui/material';

export default function FetchErrorOverlay({ ...props }) {
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
      <Typography color="text.secondary">조회중 오류가 발생했어요!</Typography>
    </Box>
  );
}
