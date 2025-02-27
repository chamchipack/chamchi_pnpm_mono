import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { handleNavigation } from '@/config/navigation';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function MyPageItem({
  label,
  type,
}: {
  label: string;
  type: 'interest' | 'review' | 'coupon';
}) {
  const router = useRouter();

  const handleRouter = () => {
    let pathKind = {
      interest: 'mypage/interest',
      coupon: 'mypage/coupon',
      review: `review/individual`,
    };
    let path = pathKind[type];
    const isWebView = handleNavigation({ path, status: 'forward' });

    if (!isWebView) return router.push(`/application/${path}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        border: '1px solid lightgray',
        borderRadius: 2,
        px: 2,
        py: 1,
        cursor: 'pointer',
      }}
      onClick={handleRouter}
    >
      <Typography fontSize={14}>{label}</Typography>

      <IconButton size="small">
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
