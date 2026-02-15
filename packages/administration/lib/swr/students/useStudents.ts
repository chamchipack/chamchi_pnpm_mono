// src/lib/swr/useStudents.ts
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher/fetcher';
import { StudentsResponse } from '@/lib/api/students';

export interface UseStudentsParams {
  keyword?: string;
  status?: boolean | null;
  page?: number;
  perPage?: number;
}

export const useStudents = ({
  keyword,
  status = null,
  page = 1,
  perPage = 10,
}: UseStudentsParams = {}) => {
  const params = new URLSearchParams();

  params.append('page', page.toString());
  params.append('perPage', perPage.toString());

  if (keyword) params.append('keyword', keyword);
  if (typeof status === 'boolean')
    params.append('currentStatus', status.toString());

  const key = `/api/students?${params.toString()}`;

  const { data, error, isLoading, mutate, ...rest } = useSWR<StudentsResponse>(
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
