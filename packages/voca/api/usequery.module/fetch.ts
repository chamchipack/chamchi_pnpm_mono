import db from '@/api/module';
import { Collection } from '@/config/defaultType';

interface Pagination {
  page: number;
  perPage: number;
}

interface StudentRows {
  rows: any[];
  total: number;
}

export const fetchData = async (
  collection: Collection,
  pagination: Pagination,
  datagridStudentState: any,
): Promise<StudentRows> => {
  const { data } = await db.search(collection, {
    pagination,
    options: { ...datagridStudentState },
  });

  let total = 0;

  if (pagination?.page && pagination.perPage) total = data?.totalItems;
  else total = data?.length;

  return { rows: Array.isArray(data) ? data : data?.items, total };
};
