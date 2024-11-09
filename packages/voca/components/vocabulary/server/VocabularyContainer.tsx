'use client';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Box, IconButton, Typography } from '@mui/material';
import ModalWrapper from 'package/src/Modal/ModalWrapper';
import { useState } from 'react';
import VocabularyContents from './VocabularyContents';
import LikedVocabulary from '@/components/liked/LikedVocabulary';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useRouter } from 'next/navigation';

interface Props {
  path: string[];
}

export default function VocabularyContainer({ ...props }: Props) {
  const router = useRouter();

  const [, , language = ''] = props?.path;
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  return (
    <>
      <IconButton aria-label="library" onClick={() => setOpen(true)}>
        <LibraryBooksIcon />
      </IconButton>

      <ModalWrapper open={open} onClose={onClose}>
        <div style={{ height: 400 }}>
          <LikedVocabulary />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: 1,
              p: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle1" color="text.primary" sx={{ my: 1 }}>
              내 단어장 목록
            </Typography>
            <IconButton
              onClick={() => {
                onClose();
                router.push(`/chamchivoca/${language}/vocabulary`);
              }}
            >
              <DirectionsIcon />
            </IconButton>
          </Box>
          <VocabularyContents clickable={false} perPage={3} />
        </div>
      </ModalWrapper>
    </>
  );
}
