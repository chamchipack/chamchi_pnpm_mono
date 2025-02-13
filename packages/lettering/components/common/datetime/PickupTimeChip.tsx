import { Box, Typography, ButtonBase } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface PickupTimeChipProps {
  onClick?: () => void; // 클릭 이벤트 (선택 사항)
  value: string;
  isTimeSelectable: boolean;
}

export default function PickupTimeChip({
  onClick,
  value,
  isTimeSelectable,
}: PickupTimeChipProps) {
  const widthCondition = () => {
    if (isTimeSelectable) return value ? 170 : 130;
    else return 130;
  };
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        minWidth: widthCondition(),
        height: 32,
        backgroundColor: value ? 'common.main' : '',
        border: value ? '' : '1px solid',
        borderColor: value ? '' : 'common.main',
        color: 'white',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // ✅ 아이콘과 텍스트 좌우 배치
        padding: '0 12px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'common.mainhover',
          opacity: 0.9,
        },
      }}
    >
      {/* 좌측 아이콘 */}
      <CalendarTodayIcon
        sx={{ fontSize: 18, color: value ? 'white' : 'common.main' }}
      />

      {/* 중앙 텍스트 */}
      <Typography
        fontSize={13}
        // fontWeight="bold"
        color={value ? 'white' : 'common.main'}
      >
        {value || '픽업시간설정'}
      </Typography>
    </ButtonBase>
  );
}
