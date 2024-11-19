import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { Collection } from '@/config/defaultType';
import { fetchData } from './fetch';

export const isValidCollection = (
  collection: string,
): collection is Collection => {
  const validCollections: Collection[] = [
    'japanese',
    'word_like',
    'vocabulary',
  ];
  return validCollections.includes(collection as Collection);
};

export const useData = (
  collection: Collection,
  pagination: {
    page: number;
    perPage: number;
  },
  filter: () => {},
) => {
  if (!collection) throw new Error('컬렉션을 지정해주세요');
  if (!isValidCollection(collection))
    throw new Error('유효하지 않은 컬렉션입니다');

  const params = filter();

  return useQuery({
    queryKey: [collection, pagination, params],
    queryFn: () => fetchData(collection, pagination, params),
    staleTime: 5000,
  });
};
