'use client';

import { useClasses } from './hooks/useClasses';
import StudentsView from './section/StudentsView';

export default function Container() {
  const {
    students,
    keyword,
    setKeyword,
    statusFilter,
    setStatusFilter,
    total,
    pagination,
    setPagination,
    isLoading,
    refetch,
  } = useClasses();

  return (
    <StudentsView
      students={students}
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
