import { atom } from 'recoil';

export const defaultValue = {};

interface SearchType {
  'markdown_title.like'?: string;
  'userName_title.like'?: string;
  'category.like'?: string;
}

export const SearchFilterAtom = atom<SearchType>({
  key: 'SearchFilterAtom',
  default: defaultValue,
});

export const PaginationAtom = atom<any>({
  key: 'PaginationAtom',
  default: { page: 1, perPage: 5 },
});
