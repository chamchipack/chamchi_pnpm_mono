import { Drawer } from '@mui/material';

interface BottomDrawerProps {
  open: boolean;
  onClose: () => void;
  minHeight?: string;
  maxHeight?: string;
  children: React.ReactNode;
}

export default function DrawerForm({
  open,
  onClose,
  minHeight = '60vh', // ✅ 기본값 설정
  maxHeight = '90vh',
  children,
}: BottomDrawerProps) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          height: '100%',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          minHeight,
          maxHeight,
        },
      }}
    >
      {children}
    </Drawer>
  );
}
