import { Box, Typography, ButtonBase } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface ListFilterChipProps {
  onClick?: () => void; // 클릭 이벤트 (선택 사항)
  value: string;
}

export default function ListFilterChip({
  onClick,
  value,
}: ListFilterChipProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        height: 32,
        border: '1px solid',
        borderColor: 'common.gray',
        color: 'white',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // ✅ 아이콘과 텍스트 좌우 배치
        padding: '0 12px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'grey.100',
          opacity: 0.9,
        },
      }}
    >
      <Typography fontSize={13} color={'common.black'}>
        {value || '기본순'}
      </Typography>
    </ButtonBase>
  );
}
