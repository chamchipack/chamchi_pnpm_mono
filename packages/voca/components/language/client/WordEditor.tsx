'use client';

import { Language } from '@/config/defaultType';
import { Typography } from '@mui/material';
import ModalWrapper from 'package/src/Modal/ModalWrapper';
import { useState } from 'react';
import EditorContainer from './EditorContainer';
import AlertModal from 'package/src/Modal/SaveModal';

interface Props {
  language: Language;
}
export default function WordEditor({ language }: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState<{ title: string; value: string }>({
    title: '',
    value: '',
  });

  const onAlertClose = () => setAlert(false);

  const onClose = () => setModalOpen(false);

  const onSetAlert = (title: string, value: string) => {
    setContent({ title, value });
    setAlert(true);
  };
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
        <EditorContainer
          language={language}
          setModalOpen={setModalOpen}
          onSetAlert={onSetAlert}
        />
      </ModalWrapper>

      <AlertModal
        open={alert}
        handleClose={onAlertClose}
        title={content?.title || '저장실패'}
        content={content?.value || '오류가 발생했습니다'}
        processing={false}
        isAlertModal={true}
        onClickCheck={() => {}}
      />
    </div>
  );
}
