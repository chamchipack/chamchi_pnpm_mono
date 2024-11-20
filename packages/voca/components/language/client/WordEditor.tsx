'use client';

import { Language } from '@/config/defaultType';
import { Typography } from '@mui/material';
import ModalWrapper from 'package/src/Modal/ModalWrapper';
import { useState } from 'react';
import EditorContainer from './EditorContainer';

interface Props {
  language: Language;
}
export default function WordEditor({ language }: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onClose = () => setModalOpen(false);
  return (
    <div style={{ padding: 20 }}>
      <Typography
        component="div"
        variant="subtitle2"
        color="text.primary"
        sx={{ cursor: 'pointer', width: 200 }}
        onClick={() => setModalOpen(true)}
      >
        눌러서 단어 에디터 열기
      </Typography>

      <ModalWrapper open={modalOpen} onClose={onClose}>
        <EditorContainer language={language} />
      </ModalWrapper>
    </div>
  );
}
