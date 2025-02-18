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

export const NickNameAtom = atom<string>({
  key: 'NickNameAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
