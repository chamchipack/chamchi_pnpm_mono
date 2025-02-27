import { Box, Typography } from '@mui/material';

interface CustomChipProps {
  title: string;
  borderColor?: string;
  textColor?: string;
}

export default function CustomChip({
  title = '',
  borderColor = 'grey.400',
  textColor = 'text.primary',
}: CustomChipProps) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 28,
        px: 2,
        border: `2px solid`,
        borderColor: `${borderColor}`,
        borderRadius: 16,
        whiteSpace: 'nowrap', // 글자가 줄바꿈되지 않도록 설정
      }}
    >
      <Typography fontSize={12} sx={{ color: textColor }}>
        {title}
      </Typography>
    </Box>
  );
}
