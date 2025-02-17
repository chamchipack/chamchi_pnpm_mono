import { Language } from '@/config/defaultType';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { pretendardFont } from 'package/styles/fonts/module';

interface Props {
  title: string;
  variant: 'subtitle1' | 'subtitle2' | 'h5' | 'h4' | 'h3' | 'h2';
  color: string;
  language: Language;
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
        sx={{
          cursor: 'pointer',
          '&: hover': { color: 'info.main' },
          ...pretendardFont,
        }}
      >
        {props?.title}
      </Typography>
    </Box>
  );
}
