// src/lib/swr/useStudents.ts
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher/fetcher';
import { Attendance } from '@/lib/type/Attendance';

export interface Response {
  items: Attendance[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface Params {
  keyword?: string;
  status?: boolean | null;
  page?: number;
  perPage?: number;
}

export const useAttendanceHistory = ({
  keyword,
  status = null,
  page = 1,
  perPage = 10,
}: Params = {}) => {
  const params = new URLSearchParams();

  params.append('page', page.toString());
  params.append('perPage', perPage.toString());

  if (keyword) params.append('keyword', keyword);
  if (typeof status === 'boolean')
    params.append('currentStatus', status.toString());

  const key = `/api/attendance/history?${params.toString()}`;

  const { data, error, isLoading, mutate, ...rest } = useSWR<Response>(
    key,
    fetcher,
  );

  return {
    // students: data?.items ?? [],
    ...data,
    isLoading,
    isError: error,
    mutate,
  };
};
