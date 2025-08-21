'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSmartNavigation } from '@/config/navigation';

import SearchInput from '@/components/common/input/SearchInput';
import dynamic from 'next/dynamic';
import PickupTimeChip from './PickupTimeChip';

dayjs.locale('ko');

const DatePickerDialog = dynamic(() => import('./DatePickerDialog'), {
  ssr: false,
  loading: () => null,
});

interface Props {
  isFilterVisable: boolean;
  isBackwardVisable: boolean;
  isTimeSelectable: boolean;
  placeholder?: string;
  isTimeForPast?: boolean;
  isClickAllowed: boolean;
  autoSearched?: boolean;
  params?: {
    query: string;
    date: string | null;
  };
  isRecentSearchAllowed?: boolean;
}

export default function InputContainer({
  isFilterVisable = false,
  isBackwardVisable = false,
  isTimeSelectable = false,
  placeholder = '',
  isTimeForPast = false,
  params = { query: '', date: null },
  isClickAllowed = false,
  autoSearched = false,
  isRecentSearchAllowed = true,
}: Props) {
  const router = useRouter();
  const smartNavigate = useSmartNavigation();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [query, setQuery] = useState(params.query || '');
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const timeFormat = 'YYYY-MM-DD';

  useEffect(() => {
    if (params.date) setSelectedDate(params.date);
  }, [params.date]);

  const handleClickSearchPage = () => {
    if (isClickAllowed) return;
    smartNavigate({ path: 'search', status: 'replace' });
  };

  const handleSearch = (date?: string) => {
    const params: Record<string, string> = {};

    if (query?.trim()) params.query = query;

    const formattedDate = dayjs(selectedDate).isValid()
      ? dayjs(selectedDate).format(timeFormat)
      : '';
    if (formattedDate) params.date = formattedDate;

    const searchParams = new URLSearchParams(params).toString();
    router.push(`/purchases?${searchParams}`);
  };

  return (
    <>
      {/* 🔍 검색 바 + 뒤로가기 */}
      <div className="flex items-center justify-between">
        <SearchInput
          isClickAllowed={isClickAllowed}
          placeholder={placeholder}
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          handleClickRouter={handleClickSearchPage}
          isRecentSearchAllowed={isRecentSearchAllowed}
        />
      </div>

      {/* 🧭 필터 및 날짜 선택 */}
      <div className="flex justify-end mt-2">
        <PickupTimeChip
          onClick={() => setOpenDatePicker(true)}
          value={selectedDate}
          isTimeSelectable={isTimeSelectable}
        />
      </div>

      {/* 📆 날짜 선택기 */}
      <DatePickerDialog
        open={openDatePicker}
        onClose={() => setOpenDatePicker(false)}
        onOpen={() => setOpenDatePicker(true)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isTimeForPast={isTimeForPast}
        autoSearched={autoSearched}
      />
    </>
  );
}
