'use client';

import { Box, Button, IconButton, Typography } from '@mui/material';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import { useRecoilState } from 'recoil';
import isEditPageon from '../academy/state';
import { useState } from 'react';
import SaveModal from 'package/src/Modal/SaveModal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PreviewIcon from '@mui/icons-material/Preview';

interface Props {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  onClickSave: () => void;
  id?: string;
  setEditPage: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export default function SettingButton({ ...props }: Props) {
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
          justifyContent: 'space-between',
          mt: 2,
        }}
      >
        <IconButton
          size="medium"
          sx={{
            px: 1,
            py: 0.5,
            mr: 2,
            borderRadius: 1,
            color: 'background.paper',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            if (props?.id) props?.setEditPage(false);
            else setIsEditPageon(false);
          }}
        >
          <ArrowBackIosNewIcon
            sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }}
          />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              나가기
            </Typography>
          </Box>
        </IconButton>

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {isMobile && (
            <IconButton
              size="medium"
              sx={{
                px: 1,
                py: 0.5,
                mr: 2,
                borderRadius: 1,
                color: 'background.paper',
                '&:hover': {},
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => props?.setPreview(true)}
            >
              <PreviewIcon
                sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }}
              />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  미리보기
                </Typography>
              </Box>
            </IconButton>
          )}

          <Button
            variant="contained"
            size="medium"
            sx={{
              px: 1,
              py: 0.5,
              mr: 2,
              borderRadius: 1,
              background: (theme) => `${theme.palette.common.black}`,
              color: 'background.paper',
              '&:hover': {
                background: (theme) => `${theme.palette.common.black}`,
              },
            }}
            onClick={() => setModal(true)}
          >
            글 저장하기
          </Button>
        </Box>
      </Box>

      <SaveModal
        open={modal}
        handleClose={() => setModal(false)}
        onClickCheck={() => {
          props?.onClickSave();
          setModal(false);
        }}
        title="글 저장하기"
        content="저장하시겠습니까?"
        processing={props?.loading}
        isAlertModal={false}
      ></SaveModal>
    </>
  );
}
