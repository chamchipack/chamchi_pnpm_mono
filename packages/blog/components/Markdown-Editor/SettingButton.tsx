'use client';

import { Box, Button } from '@mui/material';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import { useRecoilState } from 'recoil';
import isEditPageon from '../academy/state';
import { useState } from 'react';
import AlertModal from 'package/src/Modal/AlertModal';

interface Props {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  onClickSave: () => void;
  id?: string;
  setEditPage: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export default function SettingButton({
  setPreview,
  onClickSave,
  id = '',
  setEditPage,
  loading,
}: Props) {
  const isMobile = useClientSize('sm');
  const [, setIsEditPageon] = useRecoilState(isEditPageon);
  const [modal, setModal] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: 30,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          mt: 2,
        }}
      >
        {isMobile && (
          <Button
            variant="outlined"
            size="medium"
            sx={{
              px: 1,
              py: 0.5,
              mr: 2,
              borderRadius: 1,
              background: (theme) => `${theme.palette.success.main}`,
              borderColor: 'success.main',
              color: 'background.paper',
              '&:hover': {
                borderColor: 'success.dark',
                background: (theme) => `${theme.palette.success.dark}`,
              },
            }}
            onClick={() => setPreview(true)}
          >
            미리보기
          </Button>
        )}

        <Button
          variant="outlined"
          size="medium"
          sx={{
            px: 1,
            py: 0.5,
            mr: 2,
            borderRadius: 1,
            background: (theme) => `${theme.palette.warning.main}`,
            borderColor: 'warning.main',
            color: 'background.paper',
            '&:hover': {
              borderColor: 'warning.dark',
              background: (theme) => `${theme.palette.warning.dark}`,
            },
          }}
          onClick={() => {
            if (id) setEditPage(false);
            else setIsEditPageon(false);
          }}
        >
          취소하기
        </Button>

        <Button
          variant="outlined"
          size="medium"
          sx={{
            px: 1,
            py: 0.5,
            mr: 2,
            borderRadius: 1,
            background: (theme) => `${theme.palette.primary.main}`,
            borderColor: 'primary.main',
            color: 'background.paper',
            '&:hover': {
              borderColor: 'primary.dark',
              background: (theme) => `${theme.palette.primary.dark}`,
            },
          }}
          onClick={() => setModal(true)}
        >
          글 저장하기
        </Button>
      </Box>

      <AlertModal
        open={modal}
        handleClose={() => setModal(false)}
        onClickCheck={() => {
          onClickSave();
          setModal(false);
        }}
        title="글 저장하기"
        content="저장하시겠습니까?"
        processing={loading}
        isAlertModal={false}
      ></AlertModal>
    </>
  );
}
