import Box from '@mui/system/Box';

interface Props {
  onClickButton: (type: 'kakao' | 'apple') => void;
}

export default function AppleLogin({ onClickButton }: Props) {
  return (
    <Box
      component="img"
      src="/appleid_button.png"
      alt="appleid_button"
      sx={{
        width: '100%', // ✅ 부모 너비에 맞춤
      }}
      onClick={() => {
        onClickButton('apple');
      }}
    />
  );
}
