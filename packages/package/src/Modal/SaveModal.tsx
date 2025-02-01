import { Box, Button, Modal, Typography } from '@mui/material';
import { pretendardFont, spoca1, spoca2 } from 'package/styles/fonts/module';

interface Props {
  open: boolean;
  handleClose: () => void;
  onClickCheck: (any: any) => void;
  title: string;
  content: string;
  children?: React.ReactNode;
  processing: boolean;
  isAlertModal?: boolean;
}

const SaveModal = ({
  open,
  handleClose,
  onClickCheck,
  title,
  content,
  children,
  processing,
  isAlertModal = false,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            margin: '0 auto',
            width: 250,
            background: (theme) => theme.palette.background.default,
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="subtitle1"
            color={processing ? 'info.main' : 'text.primary'}
            sx={{
              display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
              mb: 3,
              ...spoca2,
            }}
          >
            {processing ? '처리 진행중' : title || ''}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mb: 3,
              display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
          >
            {processing ? '잠시만 기다려주세요! 곧 완료됩니다.' : content || ''}
          </Typography>

          <Box>{children}</Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {isAlertModal ? (
              <Button
                disabled={processing}
                variant="contained"
                sx={{
                  background: (theme) => theme.palette.background.default,
                  height: '30px',
                  width: '100%',
                  '&:hover': {
                    background: (theme) => theme.palette.grey[400],
                  },
                }}
                onClick={handleClose}
              >
                <Box style={{ width: '100%', justifyContent: 'center' }}>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    닫기
                  </Typography>
                </Box>
              </Button>
            ) : (
              <>
                <Button
                  disabled={processing}
                  variant="contained"
                  sx={{
                    background: (theme) => theme.palette.background.default,
                    height: '30px',
                    width: '40%',
                    '&:hover': {
                      background: (theme) => theme.palette.grey[400],
                    },
                  }}
                  onClick={handleClose}
                >
                  <Box style={{ width: '100%', justifyContent: 'center' }}>
                    <Typography
                      variant="h5"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      취소
                    </Typography>
                  </Box>
                </Button>
                <Button
                  disabled={processing}
                  variant="contained"
                  sx={{
                    background: (theme) => theme.palette.common.black,
                    height: '30px',
                    width: '40%',
                    '&:hover': {
                      background: (theme) => theme.palette.grey[400],
                    },
                  }}
                  onClick={onClickCheck}
                >
                  <Box style={{ width: '100%', justifyContent: 'center' }}>
                    <Typography variant="h5" color="inherit" fontWeight="bold">
                      확인
                    </Typography>
                  </Box>
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SaveModal;
