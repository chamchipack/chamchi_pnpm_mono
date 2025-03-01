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
        ㈜비바리퍼블리카
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
        사업자 등록번호 : 120-88-01280 | 대표 : 이승건
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
        호스팅 서비스 : 주식회사 비바리퍼블리카 | 통신판매업 신고번호 :
        2014-서울강남-03377{' '}
        <Typography
          component="span"
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          사업자정보확인
        </Typography>
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
        06236 서울특별시 강남구 테헤란로 142, 4층, 10층, 11층, 12층, 13층, 22층,
        23층 (역삼동, 아크플레이스)
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
        고객센터 : 서울특별시 강남구 테헤란로 133, 9층 (역삼동, 한국타이어빌딩)
      </Typography>
    </Box>
  );
}
