'use client';

import { handleNavigation } from '@/config/navigation';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

interface PopularSearchesProps {
  keywords: string[];
}

export default function CSR_PopularSearches({
  keywords = [],
}: PopularSearchesProps) {
  const router = useRouter();
  const [selectedDate] = useRecoilState(dateSelectionAtom);

  const handleRouter = (keyword: string) => {
    const path = selectedDate
      ? `/store?keyword=${keyword}&date=${selectedDate}`
      : `/store?keyword=${keyword}`;

    const isWebView = handleNavigation({
      path: 'store',
      status: 'forward',
      params: JSON.stringify({ keyword, date: selectedDate }),
    });

    if (!isWebView) router.push(path);
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-3">인기 검색어 키워드</h2>

      <div className="flex flex-wrap gap-2 py-1">
        {keywords.length ? (
          <>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                data-testid="search-popular-keyword"
                onClick={() => handleRouter(keyword)}
                className="px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {keyword}
              </button>
            ))}
          </>
        ) : (
          <span className="text-sm">인기 검색어를 정리중이에요!</span>
        )}
      </div>
    </div>
  );
}
