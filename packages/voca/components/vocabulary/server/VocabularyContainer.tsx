'use client';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton } from '@mui/material';
import ModalWrapper from 'package/src/Modal/ModalWrapper';
import { useState } from 'react';
import VocabularyContents from './VocabularyContents';
import LikedVocabulary from '@/components/liked/LikedVocabulary';

export default function VocabularyContainer() {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  return (
    <>
      <IconButton aria-label="library" onClick={() => setOpen(true)}>
        <LibraryBooksIcon />
      </IconButton>

      <ModalWrapper open={open} onClose={onClose}>
        <div style={{ height: 400 }}>
          <VocabularyContents clickable={false} perPage={3} />

          <LikedVocabulary />
        </div>
      </ModalWrapper>
    </>
  );
}
