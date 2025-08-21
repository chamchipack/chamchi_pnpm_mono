import { globalMaxWidth } from '@/config/utils/global';
import { SwipeableDrawer } from '@mui/material';

interface BottomDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void; // ✅ Swipe 감지를 위한 필수 prop
  minHeight?: string;
  maxHeight?: string;
  children: React.ReactNode;
}

export default function BottomDrawer({
  open,
  onClose,
  onOpen,
  minHeight = '60vh',
  maxHeight = '90vh',
  children,
}: BottomDrawerProps) {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen} // ✅ Swipe 감지를 위한 필수 설정
      ModalProps={{
        keepMounted: true, // ✅ 성능 최적화
      }}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: globalMaxWidth,
          height: '100%',
          minHeight,
          maxHeight,
          background: 'white',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          margin: '0 auto',
        },
      }}
    >
      {/* 상단에 스와이프 핸들 추가 */}
      <div
        style={{
          width: '50px',
          height: '5px',
          backgroundColor: '#ccc',
          borderRadius: '10px',
          margin: '8px auto', // 중앙 정렬
        }}
      />
      {children}
    </SwipeableDrawer>
  );
}
