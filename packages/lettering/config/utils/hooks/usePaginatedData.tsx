import { useEffect, useState } from 'react';

interface UsePaginatedDataProps<T> {
  data?: {
    data: {
      items: T[];
      page: {
        currentPage: number;
        totalPage: number;
      };
    };
  };
}

export default function usePaginatedData<T>({
  data,
}: UsePaginatedDataProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true); // ✅ 추가 데이터를 불러올 수 있는지 체크

  useEffect(() => {
    if (data?.data.items) {
      setItems((prev) => [...prev, ...data.data.items]);

      // ✅ 더 이상 불러올 데이터가 없는 경우 hasMore을 false로 설정
      if (data.data.page.currentPage >= data.data.page.totalPage) {
        setHasMore(false);
      }
    }
  }, [data]);

  return { items, hasMore };
}
