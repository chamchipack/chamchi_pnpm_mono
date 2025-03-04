import { Box, Button, Modal, Typography } from '@mui/material';

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

const ModalWrapper = ({
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
            width: '70%',
            maxWidth: 400,
            background: (theme) => theme.palette.background.default,
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography
            id="modal-modal-title"
            fontWeight={'bold'}
            fontSize={16}
            color={processing ? 'info.main' : 'text.primary'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 3,
            }}
          >
            {processing ? '처리 진행중' : title || ''}
          </Typography>
          <Typography
            fontSize={12}
            color="text.secondary"
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
                variant="outlined"
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
                  variant="outlined"
                  sx={{
                    border: '1px solid',
                    borderColor: 'common.main',
                    backgroundColor: 'background.default',
                    height: '30px',
                    width: '40%',
                    '&:hover': {
                      backgroundColor: 'common.main',
                      borderColor: 'common.main',
                      // opacity: 0.4,
                    },
                  }}
                  onClick={handleClose}
                >
                  <Box style={{ width: '100%', justifyContent: 'center' }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        color: 'common.main',
                        '&:hover': { color: 'white' },
                      }}
                    >
                      취소
                    </Typography>
                  </Box>
                </Button>
                <Button
                  disabled={processing}
                  variant="contained"
                  sx={{
                    backgroundColor: 'common.main',
                    height: '30px',
                    width: '40%',
                    '&:hover': {
                      backgroundColor: 'common.main',
                      opacity: 0.8,
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

export default ModalWrapper;
