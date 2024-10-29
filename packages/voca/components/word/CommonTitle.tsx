import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
  variant: 'subtitle1' | 'subtitle2' | 'h5' | 'h4' | 'h3' | 'h2';
  color: string;
  language: string;
  id: string;
}
export default function CommonTitle({ ...props }: Props) {
  const router = useRouter();
  return (
    <Box
      onClick={() =>
        router.push(`/chamchivoca/${props?.language}/${props?.id}`)
      }
    >
      <Typography
        variant={props?.variant}
        color={props?.color}
        sx={{ cursor: 'pointer' }}
      >
        {props?.title}
      </Typography>
    </Box>
  );
}
