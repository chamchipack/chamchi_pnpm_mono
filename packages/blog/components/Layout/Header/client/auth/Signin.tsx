import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { kboFont } from 'package/styles/fonts/module';
import { useState } from 'react';
import ProgressDialog from 'package/src/Modal/ProgressModal';
import { signIn } from 'next-auth/react';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signin = ({ setModal }: Props) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      handleOpen();
      const result = await signIn('credentials', {
        redirect: false,
        username: email,
        password: password,
      });

      if (result?.ok) {
        setModal(false);
        router.refresh();
      } else {
        handleClose();
      }
    } catch (error) {
      // alert("로그인 정보를 확인해주세요");
      handleClose();
    }
  };

  return (
    <>
      <ProgressDialog open={openModal} onClose={handleClose} />

      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%', // Container 최대 너비에 맞춰 조정
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ color: 'text.secondary', fontWeight: 'bold', ...kboFont }}
        >
          프로젝트 참치
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="ID"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'background.default',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'text.disabled',
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="PW"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'background.default',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'text.disabled',
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              marginTop: '12px',
              marginBottom: '8px',
              fontWeight: 'bold',
              backgroundColor: 'primary.main',
              opacity: 0.7,
              height: 40,
            }}
            // onClick={(e) => onClickLogin(e, { email, password })}
          >
            로그인
          </Button>
        </Box>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          {'Copyright © '} {new Date().getFullYear()} {' Chamchi Company. '}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          {'All rights reserved.'}
        </Typography>
      </Box>
    </>
  );
};

export default Signin;
