'use client';

import { usePOSTSearchKeyword } from '@/api/client/search';
import PickupTimeChip from '@/components/common/datetime/PickupTimeChip';
import ListFilterChip from '@/components/common/filter/ListFilterChip';
import SearchInput from '@/components/common/input/SearchInput';
import CurrentLocationTypo from '@/components/common/location/CurrentLocationTypo';
import { useSmartNavigation } from '@/config/navigation';
import { useUserInfoKeys } from '@/store/userStore/state';
import { SearchFilterValue } from '@/types/schema/SearchSchema';
import { ChevronLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import SearchTypeChip from './SearchTypeChip';

const UserAddressButton = dynamic(
  () =>
    import('@/components/page/Home/section/LocationSection/UserAddressButton'),
  { ssr: false },
);

const DatePickerDialog = dynamic(() => import('./DatePickerDialog'), {
  ssr: false,
});

const ListFilterDrawer = dynamic(
  () => import('@/components/common/filter/ListFilterDrawer'),
  { ssr: false },
);

const TypeFilterDrawer = dynamic(
  () => import('@/components/common/filter/TypeFilterChip'),
  { ssr: false },
);

type Filter = { value: SearchFilterValue; label: string };

const filterOptions: Filter[] = [
  { value: '', label: '기본순' },
  { value: 'popular', label: '인기순' },
  { value: 'rating', label: '평점 좋은 순' },
  { value: 'review', label: '리뷰 많은 순' },
  { value: 'bookmark', label: '찜 많은 순' },
];

type TypeValue = '' | 'store' | 'product';
type Type = { value: TypeValue; label: string };

const typeOptions: Type[] = [
  { value: '', label: '가게검색' },
  { value: 'product', label: '상품검색' },
];

interface Props {
  isFilterVisable: boolean;
  isBackwardVisable: boolean;
  isTimeSelectable: boolean;
  placeholder?: string;
  isTimeForPast?: boolean;
  isClickAllowed: boolean;
  autoSearched?: boolean;
  params?: {
    keyword: string;
    date: string | null;
    type?: string;
    order?: SearchFilterValue;
  };
}

const SellerListInputContainer = ({
  isFilterVisable = false,
  isBackwardVisable = false,
  isTimeSelectable = false,
  placeholder = '',
  isTimeForPast = false,
  params = { keyword: '', date: null, type: '', order: '' },
  isClickAllowed = false,
  autoSearched = false,
}: Props) => {
  const smartNavigate = useSmartNavigation();
  const router = useRouter();
  const { address } = useUserInfoKeys(['address']);
  const [localAddress, setLocalAddress] = useState<string>('');

  const [localDate, setLocalDate] = useState<string | null>(
    params.date || null,
  );
  const [keyword, setKeyword] = useState(params.keyword || '');
  const [type, setType] = useState(params.type || '');
  const [filter, setFilter] = useState<Filter>(filterOptions[0]);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  const [openTypeDrawer, setTypeDrawer] = useState(false);
  const [typeFilter, setTypeFilter] = useState<Type>(typeOptions[0]);

  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  useEffect(() => {
    const result = filterOptions.find(({ value }) => value === params.order);
    setFilter(result || filterOptions[0]);
  }, [params.order]);

  useEffect(() => {
    const result = typeOptions.find(({ value }) => value === params.type);
    setTypeFilter(result || typeOptions[0]);
  }, [params.type]);

  useEffect(() => {
    if (params?.type) setType(params?.type);
  }, [params?.type]);

  const handleBackNavigation = () => {
    smartNavigate({ path: '', status: 'back' });
  };

  const handleClickSearchPage = () => {
    if (isClickAllowed) return;
    smartNavigate({ path: 'search', status: 'replace' });
  };

  const handleSearch = useCallback(async () => {
    const date = localDate ? { date: localDate } : {};
    const _query = keyword ? { keyword } : {};
    const _type = type ? { type } : {};
    const params = { ..._query, ...date, ..._type };

    if (keyword) await usePOSTSearchKeyword(keyword);
    smartNavigate({ path: 'store', status: 'replace', params });
  }, [keyword, localDate, type, smartNavigate]);

  return (
    <>
      {/* ✅ 검색 상단 */}
      <div className="flex items-center justify-between">
        {isBackwardVisable && (
          <button onClick={handleBackNavigation} className="mr-3 mt-2">
            <ChevronLeft size={20} />
          </button>
        )}
        <div className="flex-1 mt-2">
          <SearchInput
            isClickAllowed={isClickAllowed}
            placeholder={placeholder}
            query={keyword}
            setQuery={setKeyword}
            handleSearch={handleSearch}
            handleClickRouter={handleClickSearchPage}
            isRecentSearchAllowed
          />
        </div>
      </div>

      {/* ✅ 필터 & 시간 & 타입 */}
      <div className="flex justify-end items-center mt-2 gap-2">
        <SearchTypeChip
          onClick={() => setTypeDrawer(true)}
          value={typeFilter}
        />
        <ListFilterChip
          onClick={() => setOpenFilterDrawer(true)}
          value={filter}
        />
        <PickupTimeChip
          onClick={() => setOpenDatePicker(true)}
          value={localDate}
          isTimeSelectable={isTimeSelectable}
        />
      </div>

      {/* ✅ 위치 텍스트 */}
      <div className="mt-2 w-1/2">
        {localAddress ? (
          <CurrentLocationTypo isClickAvailable />
        ) : (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push('/address')}
          >
            <UserAddressButton />
          </div>
        )}
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

      {/* ✅ 필터 드로어 */}
      {isFilterVisable && (
        <ListFilterDrawer
          open={openFilterDrawer}
          onClose={() => setOpenFilterDrawer(false)}
          onOpen={() => setOpenFilterDrawer(true)}
          value={filter}
          setValue={setFilter}
          items={filterOptions}
        />
      )}

      <TypeFilterDrawer
        open={openTypeDrawer}
        onClose={() => setTypeDrawer(false)}
        onOpen={() => setTypeDrawer(true)}
        value={typeFilter}
        setValue={setTypeFilter}
        items={typeOptions}
      />
    </>
  );
};

export default React.memo(SellerListInputContainer);
