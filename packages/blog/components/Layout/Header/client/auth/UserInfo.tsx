import { Box, Typography, Button } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserInfo = ({ setModal }: Props) => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    setModal(false);
    router.push('/pinetree/academy'); // 로그아웃 후 리디렉션 경로 설정
  };

  return (
    <>
      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          유저명: {'ㄴㅇㄹㄴㅇㄹ'}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          유저 ID: {'test'}
        </Typography>
        <Typography variant="subtitle1">작성 글 수: {30}</Typography>
      </Box>

      <Box sx={{ mt: 'auto', width: '100%' }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </Box>
    </>
  );
};

export default UserInfo;
