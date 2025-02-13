import { Box, Button, Typography } from '@mui/material';

interface FixedBottomButtonProps {
  label: string;
  onClickMove: () => void;
  isDisabled: boolean;
}

export default function BottomFixed({
  label,
  onClickMove,
  isDisabled,
}: FixedBottomButtonProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: isDisabled ? 'common.gray' : 'common.main', // ✅ 배경색 지정 (필요하면 변경 가능)
        padding: 2,
        display: 'flex',
        justifyContent: 'center', // ✅ 중앙 정렬
        alignItems: 'center',
        zIndex: 100, // ✅ 스크롤 영향 방지
        height: 70,
        '&:hover': {
          cursor: isDisabled ? 'default' : 'pointer',
        },
      }}
      onClick={onClickMove}
    >
      <Typography
        fontWeight={'bold'}
        sx={{ color: 'common.white' }}
        fontSize={18}
      >
        {label || ''}
      </Typography>
    </Box>
  );
}
