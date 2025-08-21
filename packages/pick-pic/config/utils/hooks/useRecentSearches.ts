import { recentSearchesAtom, SearchItem } from '@/store/searchData/state';
import { useRecoilState } from 'recoil';

export function useRecentSearches() {
  const [searches, setSearches] = useRecoilState(recentSearchesAtom);
  const MAX_SEARCH_HISTORY = 10;

  // 🔹 검색어 추가 (FIFO 유지, 중복 제거)
  const addSearch = async (keyword: string) => {
    const newEntry: SearchItem = {
      keyword,
      timestamp: new Date().toISOString(), // 현재 시간 저장
    };

    setSearches((prev) => {
      const filtered = prev.filter((item) => item.keyword !== keyword); // 중복 제거
      return [newEntry, ...filtered].slice(0, MAX_SEARCH_HISTORY); // 최신 검색어 유지
    });
  };

  // 🔹 특정 검색어 삭제
  const removeSearch = (keyword: string) => {
    setSearches((prev) => prev.filter((item) => item.keyword !== keyword));
  };

  // 🔹 전체 검색어 초기화
  const clearSearches = () => {
    setSearches([]);
  };

  return { searches, addSearch, removeSearch, clearSearches };
}
