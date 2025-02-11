import { Box, Typography } from '@mui/material';

export default function Test() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'info.main',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="common.main" fontSize={12}>
        Box 1 - FontSize: 12px
      </Typography>
      <Box
        sx={{
          backgroundColor: '#d1ecf1',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="info.main" fontSize={14}>
        Box 2 - FontSize: 14px
      </Typography>
      <Box
        sx={{
          backgroundColor: '#d4edda',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="success.main" fontSize={16}>
        Box 3 - FontSize: 16px
      </Typography>
      <Box
        sx={{
          backgroundColor: '#fff3cd',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="warning.main" fontSize={18}>
        Box 4 - FontSize: 18px
      </Typography>
      <Box
        sx={{
          backgroundColor: '#cce5ff',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="primary.main" fontSize={20}>
        Box 5 - FontSize: 20px
      </Typography>
      <Box
        sx={{
          backgroundColor: '#f5c6cb',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="error.dark" fontSize={22}>
        Box 6 - FontSize: 22px
      </Typography>
      <Box
        sx={{
          backgroundColor: '#bee5eb',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="info.dark" fontSize={24}>
        Box 7 - FontSize: 24px
      </Typography>
      <Box
        sx={{
          backgroundColor: '#c3e6cb',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="success.dark" fontSize={26}>
        Box 8 - FontSize: 26px
      </Typography>
      <Box
        sx={{
          backgroundColor: '#ffeeba',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="warning.dark" fontSize={28}>
        Box 9 - FontSize: 28px
      </Typography>
      <Box
        sx={{
          backgroundColor: '#b8daff',
          padding: 2,
          borderRadius: 2,
          marginBottom: 1,
        }}
      ></Box>
      <Typography color="secondary.main" fontSize={30}>
        Box 10 - FontSize: 30px
      </Typography>
    </>
  );
}
