import { atom } from 'recoil';

const MAX_SEARCH_HISTORY = 10;

export const recentSearchesAtom = atom<string[]>({
  key: 'recentSearches',
  default: [],
});
