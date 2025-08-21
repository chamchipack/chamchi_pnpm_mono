'use client';

import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { useSmartNavigation } from '@/config/navigation';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';

import PickupTimeChip from '@/components/common/datetime/PickupTimeChip';
import SearchInput from '@/components/common/input/SearchInput';

import { usePOSTSearchKeyword } from '@/api/client/search';
import { useRouter } from 'next/navigation';
import type { PageProps } from '.';
import SearchTypeChip from '../../Store/list/filter/SearchTypeChip';

dayjs.locale('ko');

const TypeFilterDrawer = dynamic(
  () => import('@/components/common/filter/TypeFilterChip'),
  { ssr: false },
);

const DatePickerDialog = dynamic(
  () => import('@/components/common/datetime/DatePickerDialog'),
  {
    ssr: false,
    loading: () => null,
  },
);

type TypeValue = '' | 'store' | 'product';
type Type = { value: TypeValue; label: string };

const typeOptions: Type[] = [
  { value: '', label: '가게검색' },
  { value: 'product', label: '상품검색' },
];

const CSR_SearchInputContainer = ({
  isTimeSelectable = false,
  placeholder = '',
  isTimeForPast = false,
  isClickAllowed = false,
  autoSearched = false,
}: PageProps) => {
  const smartNavigate = useSmartNavigation();
  const router = useRouter();

  const setGlobalDate = useSetRecoilState(dateSelectionAtom);
  const resetDateAtom = useResetRecoilState(dateSelectionAtom);

  const [localDate, setLocalDate] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState<'store' | 'product'>('store');
  const [typeFilter, setTypeFilter] = useState<Type>(typeOptions[0]);
  const [openTypeDrawer, setTypeDrawer] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  useEffect(() => {
    resetDateAtom();
  }, []);

  const handleClickSearchPage = () => {
    if (isClickAllowed) return;
    smartNavigate({ path: 'search', status: 'replace' });
  };

  const lastCalled = useRef<number | null>(null);

  const handleSearch = useCallback(async () => {
    const now = Date.now();
    if (lastCalled.current && now - lastCalled.current < 500) return;
    lastCalled.current = now;

    const date = localDate ? { date: localDate } : {};
    const _query = keyword ? { keyword } : {};

    const _type = { type: typeFilter?.value };
    const params = { ..._query, ...date, ..._type };

    if (keyword) await usePOSTSearchKeyword(keyword);

    setGlobalDate(localDate);
    smartNavigate({ path: 'store', status: 'forward', params });
  }, [localDate, keyword, typeFilter]);

  return (
    <>
      {/* ✅ 상단 검색 인풋 */}
      <div
        className="flex items-center justify-between"
        onMouseEnter={() => router.prefetch('/store')}
      >
        <SearchInput
          isClickAllowed={isClickAllowed}
          placeholder={placeholder || ''}
          query={keyword}
          setQuery={setKeyword}
          handleSearch={handleSearch}
          handleClickRouter={handleClickSearchPage}
          isRecentSearchAllowed
        />
      </div>

      {/* ✅ 시간 선택 필터 */}
      <div className="flex justify-end mt-2 gap-2">
        <SearchTypeChip
          onClick={() => setTypeDrawer(true)}
          value={typeFilter}
        />
        <PickupTimeChip
          onClick={() => setOpenDatePicker(true)}
          value={localDate}
          isTimeSelectable={isTimeSelectable}
        />
      </div>

      {/* ✅ 날짜 선택 다이얼로그 */}
      <DatePickerDialog
        open={openDatePicker}
        onClose={() => setOpenDatePicker(false)}
        onOpen={() => setOpenDatePicker(true)}
        selectedDate={localDate}
        setSelectedDate={setLocalDate}
        isTimeSelectable={isTimeSelectable}
        isTimeForPast={isTimeForPast}
        autoSearched={autoSearched}
      />

      <TypeFilterDrawer
        open={openTypeDrawer}
        onClose={() => setTypeDrawer(false)}
        onOpen={() => setTypeDrawer(true)}
        value={typeFilter}
        setValue={setTypeFilter}
        items={typeOptions}
        isUsingParams={false}
      />
    </>
  );
};

export default React.memo(CSR_SearchInputContainer);
