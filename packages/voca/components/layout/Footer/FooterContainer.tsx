'use client';
import { Box, IconButton } from '@mui/material';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRecoilState } from 'recoil';
import { darkModeState } from '@/config/stylemode';
import AuthComponent from './AuthComponent';
import VocabularyContainer from '@/components/vocabulary/server/VocabularyContainer';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

export default function FooterContainer() {
  const [darkmode, setDarkmode] = useRecoilState(darkModeState);
  const { data: session } = useSession();
  const path = usePathname().split('/') || 0;

  const toggleDarkMode = useCallback(() => {
    setDarkmode((prev) => !prev);
  }, [setDarkmode]);

  return (
    <Box
      sx={{
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
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <IconButton aria-label="font download">
          <FontDownloadIcon />
        </IconButton>
        <AuthComponent />

        {path.length > 2 && session && <VocabularyContainer path={path} />}

        <IconButton aria-label="library" onClick={toggleDarkMode}>
          <DarkModeIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
