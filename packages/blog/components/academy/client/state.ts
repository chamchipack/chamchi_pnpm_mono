import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const defaultValue = { 'category.like': '' };

interface SearchType {
  'markdown_title.like'?: string;
  'userName_title.like'?: string;
  'category.like'?: string;
}

export const SearchFilterAtom = atom<SearchType>({
  key: 'SearchFilterAtom',
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
});

export const SearchTextAtom = atom<string>({
  key: 'SearchTextAtom',
  default: '',
});

export const SearchCategoryAtom = atom<string>({
  key: 'SearchCategoryAtom',
  default: '',
});

export const PaginationAtom = atom<any>({
  key: 'PaginationAtom',
  default: { page: 1, perPage: 5 },
  effects_UNSTABLE: [persistAtom],
});
