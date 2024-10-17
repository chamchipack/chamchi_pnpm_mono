import { atom } from 'recoil';

export const defaultValue = {};

interface SearchType {
  'markdown_title.like'?: string;
  'userName_title.like'?: string;
  'category.like'?: string;
}

const SearchFilterAtom = atom<SearchType>({
  key: 'SearchFilterAtom',
  default: defaultValue,
});

export default SearchFilterAtom;
