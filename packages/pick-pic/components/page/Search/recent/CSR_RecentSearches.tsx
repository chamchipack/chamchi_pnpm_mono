'use client';

import { handleNavigation } from '@/config/navigation';
import { useRecentSearches } from '@/config/utils/hooks/useRecentSearches';
import { formatTimeAgo } from '@/config/utils/time/formatTimeAgo';
import { dateSelectionAtom } from '@/store/otherStore/dateSelection';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function CSR_RecentSearches() {
  const router = useRouter();
  const { searches, removeSearch } = useRecentSearches();
  const [clientSearches, setClientSearches] = useState<typeof searches>([]);
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

  useEffect(() => {
    setClientSearches(searches);
  }, [searches]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-1">최근 검색어</h2>
      <p className="text-xs text-gray-500 mb-4">최대 10개까지 저장됩니다</p>

      {clientSearches.length > 0 ? (
        <div className="space-y-3">
          {clientSearches.map(({ keyword, timestamp }) => {
            if (!keyword?.trim()) return null;

            return (
              <div
                key={`${keyword}-${timestamp}`}
                className="flex justify-between items-center  pb-2"
              >
                <p
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleRouter(keyword)}
                >
                  {keyword}
                </p>

                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <span>{formatTimeAgo(timestamp)}</span>
                  <button
                    onClick={() => removeSearch(keyword)}
                    aria-label="삭제"
                    className="hover:text-gray-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500 mt-4">
          최근 검색어가 없습니다.
        </p>
      )}
    </div>
  );
}
