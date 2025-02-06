import { Box, Typography, Button, Avatar } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProgressDialog from 'package/src/Modal/ProgressModal';
import { useState } from 'react';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserInfo = ({ setModal }: Props) => {
  const router = useRouter();
  const { data } = useSession();

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleLogout = async () => {
    handleOpen();

    try {
      await signOut({ redirect: false });
      router.push('/main'); // 로그아웃 후 리디렉션 경로 설정
      setModal(false);

      handleClose();
    } catch {
      handleClose();
    }
  };

  return (
    <>
      <ProgressDialog open={openModal} onClose={handleClose} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // 위 아래에 공간을 균등하게 배치
          height: '100%',
        }}
      >
        {/* 유저 정보 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt={data?.user?.username}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 56, height: 56, mr: 2 }}
          />

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {data?.user?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.user?.name}
            </Typography>
          </Box>
        </Box>

        {/* 로그아웃 버튼 */}
        <Box sx={{ width: '100%' }}>
          <Button
            variant="contained"
            sx={{
              background: (theme) => theme.palette.common.black,
              height: 30,
            }}
            fullWidth
            onClick={handleLogout}
            disabled={openModal}
          >
            <Typography variant="subtitle2">로그아웃</Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserInfo;
