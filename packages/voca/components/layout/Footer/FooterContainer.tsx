'use client';
import { Box, IconButton } from '@mui/material';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRecoilState } from 'recoil';
import { darkModeState } from '@/config/stylemode';

export default function FooterContainer() {
  const [darkmode, setDarkmode] = useRecoilState(darkModeState);
  return (
    <Box
      sx={{
        // backgroundColor: '#f1f1f1',
        padding: '10px 20px',
        textAlign: 'center',
        position: 'fixed',
        background: (theme) => theme.palette.background.default,
        bottom: 0,
        width: '100%',
        borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // 아이콘을 가운데로 정렬
          alignItems: 'center',
          gap: 4, // 아이콘 간의 간격
        }}
      >
        <IconButton aria-label="font download">
          <FontDownloadIcon />
        </IconButton>
        <IconButton aria-label="account">
          <AccountCircleIcon />
        </IconButton>
        <IconButton aria-label="library">
          <LibraryBooksIcon />
        </IconButton>
        <IconButton aria-label="library" onClick={() => setDarkmode(!darkmode)}>
          <DarkModeIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
