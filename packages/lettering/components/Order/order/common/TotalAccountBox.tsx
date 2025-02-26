import { Box, Button, Typography } from '@mui/material';

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
}

export default function TotalAccountBox({
  label,
  onClick,
}: FixedBottomButtonProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'common.main', // ✅ 배경색 지정 (필요하면 변경 가능)
        padding: 2,
        display: 'flex',
        justifyContent: 'center', // ✅ 중앙 정렬
        alignItems: 'center',
        zIndex: 100, // ✅ 스크롤 영향 방지
        height: 70,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={onClick}
    >
      <Typography
        fontWeight={'bold'}
        sx={{ color: 'common.white' }}
        fontSize={18}
      >
        32,800원{' '}
        <Typography fontWeight={'bold'} component={'span'} fontSize={18}>
          결제하기
        </Typography>
      </Typography>
    </Box>
  );
}
