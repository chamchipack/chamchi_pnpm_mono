'use client';
import SearchInput from '@/components/Home/top/SearchInput';
import { handleNavigation } from '@/config/navigation';
import { Box, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PickupTimeChip from '@/components/common/datetime/PickupTimeChip';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import DatePickerDialog from '@/components/common/datetime/DatePickerDialog';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function InputContainer() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState(false);

  const handleRouter = () => {
    const isWebView = handleNavigation({ path: '', status: 'back' });
    if (!isWebView) return router.back();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <IconButton onClick={handleRouter} sx={{ mr: 1.5 }}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <SearchInput isAllowed={true} />
      </Box>

      {/* ✅ 오른쪽 정렬된 칩 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <PickupTimeChip
          onClick={() => setOpen(true)}
          value={selectedDate ? selectedDate.format('YYYY. MM. DD') : ''}
        />
      </Box>

      {/* ✅ 분리된 DatePickerDialog */}
      <DatePickerDialog
        open={open}
        onClose={() => setOpen(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
}
