'use client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import EventBox from './EventBox';
import ProfileSection from './ProfileSection';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';
import MyPageItem from './MyPageItem';

const menuItemsMap = {
  faq: '자주 묻는 질문',
  'terms-and-policies': '약관 및 정책',
  notices: '공지사항',
  'customer-support': '고객센터',
};

function InfoGrid() {
  const router = useRouter();

  const handleRouter = (params: string) => {
    let path = 'policy';
    const rs = JSON.stringify({ policy: params });
    const isWebView = handleNavigation({ path, status: 'forward', params: rs });

    if (!isWebView) return router.push(`/application/${path}?policy=${params}`);
  };
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
        color: 'common.gray',
      }}
    >
      {Object.entries(menuItemsMap).map(([value, label], index) => (
        <Typography
          key={index}
          variant="body2"
          color="text.secondary"
          onClick={() => handleRouter(value)}
        >
          {label}
        </Typography>
      ))}
    </Box>
  );
}

export default function MyPageContainer() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <ProfileSection />
      <MyPageItem label="나의 리뷰 관리" type="review" />
      <MyPageItem label="찜 리스트" type="interest" />
      <MyPageItem label="나의 쿠폰함" type="coupon" />
      {/* <EventBox /> */}
      <Divider sx={{ my: 2 }} />
      <InfoGrid />
    </Box>
  );
}
