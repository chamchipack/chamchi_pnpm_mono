'use client';
import SearchInput from '@/components/Home/top/SearchInput';
import { handleNavigation } from '@/config/navigation';
import { Box, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PickupTimeChip from '@/components/common/datetime/PickupTimeChip';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import DatePickerDialog from '@/components/common/datetime/DatePickerDialog';
import 'dayjs/locale/ko';
import ListFilterChip from '@/components/common/filter/ListFilterChip';
import ListFilterDrawer from '@/components/common/filter/ListFilterDrawer';

dayjs.locale('ko');

interface Props {
  isFilterVisable: boolean;
  isBackwardVisable: boolean;
  isTimeSelectable: boolean;
}

const items = ['항목 1', '항목 2', '항목 3', '항목 4', '항목 5', '항목 6'];

export default function InputContainer({
  isFilterVisable = false,
  isBackwardVisable = false,
  isTimeSelectable = false,
}: Props) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [filter, setFilter] = useState<string>(items[0] || '');

  const timeFormat = `YYYY. MM. DD. ${isTimeSelectable ? 'HH:mm' : ''}`;

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

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
        {isBackwardVisable && (
          <IconButton onClick={handleRouter} sx={{ mr: 1.5 }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        )}
        <SearchInput
          isAllowed={true}
          selectedDate={selectedDate?.format(timeFormat) || ''}
        />
      </Box>

      {/* ✅ 오른쪽 정렬된 칩 버튼 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        {isFilterVisable && (
          <Box sx={{ mr: 1 }}>
            <ListFilterChip
              onClick={() => setOpenFilter(true)}
              value={filter}
            />
          </Box>
        )}

        <PickupTimeChip
          onClick={() => setOpen(true)}
          value={selectedDate ? selectedDate.format(timeFormat) : ''}
          isTimeSelectable={isTimeSelectable}
        />
      </Box>

      {/* ✅ 분리된 DatePickerDialog */}
      <DatePickerDialog
        open={open}
        onClose={() => setOpen(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isTimeSelectable={isTimeSelectable}
      />

      {isFilterVisable && (
        <ListFilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          value={filter}
          setValue={setFilter}
          items={items}
        />
      )}
    </>
  );
}
