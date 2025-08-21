import {
  recentlyViewedProductAtom,
  recentlyViewedProducts,
} from '@/store/recentProductStore/state';
import { useRecoilState } from 'recoil';

export function useViewedProduct() {
  const [viewedProducts, setViewedProducts] = useRecoilState(
    recentlyViewedProductAtom,
  );
  const MAX_SEARCH_HISTORY = 6;

  // 🔹 검색어 추가 (FIFO 유지, 중복 제거)
  const addViewedProduct = (productId: string) => {
    const newEntry: recentlyViewedProducts = {
      productId,
      timestamp: new Date().toISOString(),
    };

    setViewedProducts((prev) => {
      const filtered = prev.filter((item) => item.productId !== productId); // 중복 제거
      const updated = [newEntry, ...filtered]; // 뒤에 추가 (FIFO)
      return updated.slice(0, MAX_SEARCH_HISTORY); // 앞에서 자름 (가장 최신부터 유지)
    });
  };

  // 🔹 특정 검색어 삭제
  const removeViewedProduct = (productId: string) => {
    setViewedProducts((prev) =>
      prev.filter((item) => item.productId !== productId),
    );
  };

  // 🔹 전체 검색어 초기화
  const clearViewedProduct = () => {
    setViewedProducts([]);
  };

  return {
    viewedProducts,
    addViewedProduct,
    removeViewedProduct,
    clearViewedProduct,
  };
}
