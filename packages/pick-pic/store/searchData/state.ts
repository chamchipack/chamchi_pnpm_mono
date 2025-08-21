import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const MAX_SEARCH_HISTORY = 10;

export interface SearchItem {
  keyword: string;
  timestamp: string; // ISO 8601 형식 (new Date().toISOString())
}

export const recentSearchesAtom = atom<SearchItem[]>({
  key: 'recentSearches',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
