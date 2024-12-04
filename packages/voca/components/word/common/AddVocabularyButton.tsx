import IconButton from '@mui/material/IconButton';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Box, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import ModalWrapper from 'package/src/Modal/ModalWrapper';
import VocabularyContents from '@/components/vocabulary/server/VocabularyContents';
import AlertModal from 'package/src/Modal/SaveModal';

interface Props {
  wordId: string;
}

export default function AddVocabularyButton({ wordId = '' }: Props) {
  const [open, setOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState<{ title: string; value: string }>({
    title: '',
    value: '',
  });

  const onSetAlert = (title: string, value: string) => {
    setContent({ title, value });
    setAlert(true);
  };

  const onAlertClose = () => setAlert(false);

  const onClose = () => setOpen(false);

  const onClickEvent = async (value: 'error' | 'already' | 'success') => {
    if (value === 'error')
      return onSetAlert('로딩 실패', '알 수 없는 오류가 발생했습니다.');
    else if (value === 'already')
      return onSetAlert(
        '저장실패',
        '선택한 단어는 해당 단어장에 이미 저장되어있습니다.',
      );
    else {
      onSetAlert('저장 성공', '단어장에 저장 되었습니다.');
      setOpen(false);
    }
  };

  return (
    <>
      <Tooltip title={'단어장에 추가'}>
        <IconButton onClick={() => setOpen(true)}>
          <PlaylistAddIcon />
        </IconButton>
      </Tooltip>

      <ModalWrapper open={open} onClose={onClose}>
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
        </Box>
        <VocabularyContents
          clickable={false}
          perPage={3}
          onClickEvent={onClickEvent}
          selectable={true}
          wordId={wordId}
        />
      </ModalWrapper>

      <AlertModal
        open={alert}
        handleClose={onAlertClose}
        title={content?.title || '저장실패'}
        content={content?.value || '오류가 발생했습니다'}
        processing={false}
        isAlertModal={true}
        onClickCheck={() => {
          console.log('????');
        }}
      />
    </>
  );
}
