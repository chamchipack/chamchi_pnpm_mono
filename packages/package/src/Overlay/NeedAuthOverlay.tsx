'use client';

import { Box, Typography } from '@mui/material';

export default function NeedAuthOverlay({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ my: 4 }}
      >
        <Typography variant="subtitle1" mb={2} color="text.primary">
          로그인이 필요한 서비스입니다.
        </Typography>

        {children}
      </Box>
    </>
  );
}
