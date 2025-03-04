'use client';
import useDetectiveWebview from '@/config/utils/webview/useDetectiveWebview';
import { Box, Typography } from '@mui/material';

export default function CompanyInformation() {
  const isWebView = useDetectiveWebview();
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5', // ✅ 배경색 옅은 회색
        padding: 2,
        borderRadius: 2,
        mb: isWebView ? 0 : 10,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" sx={{ my: 2 }}>
        법인명
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
        사업자 등록번호 : 000-80-00000 | 대표 : 대표명
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
        호스팅 서비스 : 주식회사 법인명 | 통신판매업 신고번호 :
        2024-서울강남-00000{' '}
        <Typography
          component="span"
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          사업자정보확인
        </Typography>
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
        13110 경기도 성남시 수정구 성남대로1237번길 8-21
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
        고객센터 : 경기도 성남시 수정구 성남대로1237번길 8-21
      </Typography>
    </Box>
  );
}
