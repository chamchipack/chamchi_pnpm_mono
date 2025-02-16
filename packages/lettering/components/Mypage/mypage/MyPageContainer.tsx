'use client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import EventBox from './EventBox';
import ProfileSection from './ProfileSection';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

function MenuItem({
  label,
  type,
}: {
  label: string;
  type: 'interest' | 'review';
}) {
  const router = useRouter();

  const handleRouter = () => {
    let pathKind = {
      interest: 'mypage/interest',
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
        p: 2,
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

function InfoGrid() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
        color: 'common.gray',
      }}
    >
      {['자주 묻는 질문', '약관 및 정책', '공지사항', '고객센터'].map(
        (item, index) => (
          <Typography key={index} fontSize={14}>
            {item}
          </Typography>
        ),
      )}
    </Box>
  );
}

export default function MyPageContainer() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <ProfileSection />
      <MenuItem label="나의 리뷰 관리" type="review" />
      <MenuItem label="찜 리스트" type="interest" />
      <EventBox />
      <Divider sx={{ my: 2 }} />
      <InfoGrid />
    </Box>
  );
}
