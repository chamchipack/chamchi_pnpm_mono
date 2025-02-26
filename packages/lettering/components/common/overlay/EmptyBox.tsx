import { Box, Typography } from '@mui/material';

interface EmptyBoxProps {
  title: string;
  subTitle?: string;
}

export default function EmptyBox({ title, subTitle }: EmptyBoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 7,
        width: '100%',
      }}
    >
      <Typography fontSize={16} fontWeight="bold" color="text.secondary">
        {title}
      </Typography>

      {subTitle && (
        <Typography fontSize={14} color="text.secondary">
          {subTitle}
        </Typography>
      )}

      <Box
        component="img"
        src="/exclamation.png"
        alt="No Notification"
        sx={{
          width: 70,
          height: 70,
          mt: 1,
        }}
      />
    </Box>
  );
}
