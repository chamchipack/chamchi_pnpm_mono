'use client';

import { useEffect, useMemo, useState } from 'react';
import { useStudents as getStudents } from '@/lib/swr/students/useStudents';

export type Student = {
  id: number;
  name: string;
  status: 'active' | 'paused' | 'completed';
  className: string;
};

export function useStudents() {
  const [keyword, setKeyword] = useState('');
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);

  const { items, isLoading, isError, mutate, ...etc } = getStudents({
    page: pagination.page,
    perPage: pagination.perPage,
    keyword,
    status: statusFilter,
  });

  return {
    students: items || [],
    total: etc.totalItems || 0,
    keyword,
    setKeyword,
    statusFilter,
    setStatusFilter,
    pagination,
    setPagination,
    isLoading,
    refetch: mutate,
  };
}
