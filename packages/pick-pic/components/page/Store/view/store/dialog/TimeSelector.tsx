import { Box, Button, Typography } from '@mui/material';

interface TimeSelectorProps {
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  breakStartTime?: number; // 예: 12
  breakEndTime?: number; // 예: 13
}

export default function TimeSelector({
  startTime,
  endTime,
  selectedTime,
  setSelectedTime,
  breakStartTime,
  breakEndTime,
}: TimeSelectorProps) {
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);

  const timeSlots: string[] = [];
  let current = new Date(start);

  while (current < end) {
    timeSlots.push(current.toTimeString().slice(0, 5)); // "HH:MM"
    current.setMinutes(current.getMinutes() + 30);
  }

  const isInBreakTime = (time: string) => {
    if (typeof breakStartTime !== 'number' || typeof breakEndTime !== 'number')
      return false;

    const [hour] = time.split(':').map(Number);
    return hour >= breakStartTime && hour < breakEndTime;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        px: 2,
        mt: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1,
          width: '100%',
          maxWidth: '600px',
        }}
      >
        {timeSlots.map((time) => {
          const disabled = isInBreakTime(time);

          return (
            <Button
              key={time}
              onClick={() => !disabled && setSelectedTime(time)}
              disabled={disabled}
              sx={{
                // border: '1px solid',
                // borderColor: disabled
                //   ? 'grey.200'
                //   : selectedTime === time
                //     ? 'common.main'
                //     : 'text.secondary',
                backgroundColor: disabled
                  ? 'white'
                  : selectedTime === time
                    ? 'common.main'
                    : 'grey.100',
                minWidth: 0,
                flexGrow: 1,
                height: '40px',
                textAlign: 'center',
                '&:hover': {
                  backgroundColor:
                    selectedTime === time ? 'common.main' : 'grey.300',
                },
              }}
            >
              <Typography
                fontSize={14}
                fontWeight={selectedTime === time ? 'bold' : 'none'}
                sx={{
                  color: disabled
                    ? 'grey.200'
                    : selectedTime === time
                      ? 'common.white'
                      : 'text.secondary',
                }}
              >
                {time}
              </Typography>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
