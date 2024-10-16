import { Modal, Box } from '@mui/material';

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper = ({ open, onClose, children }: ModalWrapperProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
