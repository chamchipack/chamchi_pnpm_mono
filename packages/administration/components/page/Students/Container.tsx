'use client';

import { useStudents } from './hooks/useStudents';
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
  } = useStudents();

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
