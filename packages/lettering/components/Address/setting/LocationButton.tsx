import { Button, Box, Typography } from '@mui/material';

interface LocationButtonProps {
  onClick: () => void;
  text: string;
  isError?: boolean;
  isLoading?: boolean;
}

export default function LocationButton({
  onClick,
  text,
  isError,
  isLoading,
}: LocationButtonProps) {
  return (
    <Box
      sx={{
        backgroundColor: isError ? '#fdd' : isLoading ? '#ccc' : '#eee',
        borderRadius: 3,
        color: '#333',
        height: 40,
        mt: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: isLoading ? 'default' : 'pointer',
      }}
      onClick={isLoading ? undefined : onClick}
    >
      <Typography fontSize={14}>{text}</Typography>
    </Box>
  );
}
