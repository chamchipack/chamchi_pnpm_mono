import { useRecoilState } from 'recoil';
import { recentSearchesAtom, SearchItem } from './state';

export function useRecentSearches() {
  const [searches, setSearches] = useRecoilState(recentSearchesAtom);
  const MAX_SEARCH_HISTORY = 10;

  // 🔹 검색어 추가 (FIFO 유지, 중복 제거)
  const addSearch = (query: string) => {
    const newEntry: SearchItem = {
      query,
      timestamp: new Date().toISOString(), // 현재 시간 저장
    };

    setSearches((prev) => {
      const filtered = prev.filter((item) => item.query !== query); // 중복 제거
      return [newEntry, ...filtered].slice(0, MAX_SEARCH_HISTORY); // 최신 검색어 유지
    });
  };

  // 🔹 특정 검색어 삭제
  const removeSearch = (query: string) => {
    setSearches((prev) => prev.filter((item) => item.query !== query));
  };

  // 🔹 전체 검색어 초기화
  const clearSearches = () => {
    setSearches([]);
  };

  return { searches, addSearch, removeSearch, clearSearches };
}
