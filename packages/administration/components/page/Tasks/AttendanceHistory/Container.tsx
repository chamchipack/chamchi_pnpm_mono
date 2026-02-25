'use client';

import { useAttendanceHistory } from './hooks/useAttendanceHistory';
import AttendanceView from './section/AttendanceView';

export default function Container() {
  const {
    data,
    keyword,
    setKeyword,
    statusFilter,
    setStatusFilter,
    total,
    pagination,
    setPagination,
    isLoading,
    refetch,
  } = useAttendanceHistory();

  return (
    <AttendanceView
      data={data}
      keyword={keyword}
      total={total}
      pagination={pagination}
      setPagination={setPagination}
      statusFilter={statusFilter}
      onKeywordChange={setKeyword}
      onStatusChange={setStatusFilter}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
}
