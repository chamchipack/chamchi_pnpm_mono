'use client';

import { useAnnouncementsInfinite } from '@/api/client/announcement';
import EmptyDataOverlay from '@/components/common/layout/EmptyDataOverlay';
import useInfiniteScrollObserver from '@/config/utils/hooks/infinite-scroll/useInfiniteScrollObserver';
import { DataStructureKey } from '@/types/schema/default';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

interface Props {
  type: string;
}

export default function AnnouncementContainer({ type }: Props) {
  const limit = 10;
  const { data, size, setSize, isValidating } =
    useAnnouncementsInfinite<DataStructureKey.announcement>({
      page: 1,
      limit,
    });

  const items =
    data && data[0]?.message !== 'error'
      ? data.flatMap((page) => page.data.items)
      : [];

  const totalPage = Math.ceil((data?.[0]?.data?.totalCount ?? 0) / limit);
  const observerRef = useRef(null);

  useInfiniteScrollObserver({
    observerRef,
    isValidating,
    currentPage: size,
    totalPage,
    loadMore: () => setSize(size + 1),
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (!items.length) return null;

  return (
    <div className="flex flex-col gap-2">
      {isValidating && size === 1 ? (
        Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="my-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="w-full h-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))
      ) : items.length ? (
        <>
          {items.map(({ _id, title, description }) => {
            const isOpen = expandedId === _id;
            return (
              <div key={_id} className="rounded-lg bg-gray-100">
                <button
                  onClick={() => handleToggle(_id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold"
                >
                  <span>{title}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-sm text-gray-700 whitespace-pre-line">
                    {description}
                  </div>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <div className="mt-[50%] h-[200px]">
          <EmptyDataOverlay title="공지사항 목록이 없어요" />
        </div>
      )}

      {size < totalPage && (
        <div
          ref={observerRef}
          className="flex justify-center items-center my-4"
        >
          <svg
            className="animate-spin h-5 w-5 text-pink-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
