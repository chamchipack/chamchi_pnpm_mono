import Box from '@mui/system/Box';

type ReturnType = 'webview' | 'web' | 'failed';

interface Props {
  onClickButton: (type: 'kakao' | 'apple') => ReturnType;
}

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

export default function KakaoLogin({ onClickButton }: Props) {
  const webLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <Box
      component="img"
      src="/kakao_login_large_wide.png"
      alt="kakao_login_large_wide"
      sx={{
        width: '100%', // ✅ 부모 너비에 맞춤
      }}
      onClick={() => {
        const isWebView = onClickButton('kakao');
        if (isWebView === 'web') webLogin();
      }}
    />
  );
}
