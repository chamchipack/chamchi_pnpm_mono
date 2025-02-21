import Box from '@mui/system/Box';

interface Props {
  onClickButton: (type: 'kakao' | 'apple') => void;
}

export default function KakaoLogin({ onClickButton }: Props) {
  return (
    <Box
      component="img"
      src="/kakao_login_large_wide.png"
      alt="kakao_login_large_wide"
      sx={{
        width: '100%', // ✅ 부모 너비에 맞춤
      }}
      onClick={() => {
        onClickButton('kakao');
      }}
    />
  );
}
