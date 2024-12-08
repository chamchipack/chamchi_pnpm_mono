import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { Collection } from '@/config/defaultType';
import { fetchData } from '@/api/usequery.module/fetch';
import { ParametersAtom } from './state';

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
  language: any,
  type: any,
) => {
  if (!collection) throw new Error('컬렉션을 지정해주세요');
  if (!isValidCollection(collection))
    throw new Error('유효하지 않은 컬렉션입니다');

  const params = useRecoilValue(ParametersAtom);
  const merged = {
    'language.like': language,
    'type.like': type,
    ...params,
  };

  return useQuery({
    queryKey: [collection, pagination, merged],
    queryFn: () => fetchData(collection, pagination, merged),
    staleTime: 5000,
  });
};
