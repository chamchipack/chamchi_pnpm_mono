'use client';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { IconButton } from '@mui/material';
import ModalWrapper from 'package/src/Modal/ModalWrapper';
import { useState } from 'react';
import VocabularyContents from './VocabularyContents';

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
          <VocabularyContents />
        </div>
      </ModalWrapper>
    </>
  );
}
