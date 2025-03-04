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
import { useRecoilState } from 'recoil';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';

dayjs.locale('ko');

interface Props {
  isFilterVisable: boolean;
  isBackwardVisable: boolean;
  isTimeSelectable: boolean;
  placeholder?: string;
  isTimeForPast?: boolean;
  params?: {
    query: string;
    date: Dayjs | null;
  };
}

const items = ['기본순', '별점 높은 순', '주문 많은 순', '찜 많은 순'];

export default function InputContainer({
  isFilterVisable = false,
  isBackwardVisable = false,
  isTimeSelectable = false,
  placeholder = '',
  isTimeForPast = false,
  params = { query: '', date: null },
}: Props) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useRecoilState<Dayjs | null>(
    dateSelectionAtom,
    // params.date ? dayjs(params.date) : null,
  );

  useEffect(() => {
    if (params.date) {
      setSelectedDate(dayjs(params.date));
    }
  }, [params.date]);

  const [filter, setFilter] = useState<string>(items[0] || '');

  const timeFormat = isTimeSelectable ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';

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
          placeholder={placeholder || ''}
          queryInput={params.query}
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
        isTimeForPast={isTimeForPast}
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
