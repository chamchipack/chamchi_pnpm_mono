import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

export default function BackDrop({ text = '' }) {
  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={true} // 로딩 중일 때 Backdrop 표시
      >
        <CircularProgress color="inherit" />
        <Typography variant="subtitle2" sx={{ color: 'white', mt: 2 }}>
          {text}
        </Typography>
      </Backdrop>
    </>
  );
}
