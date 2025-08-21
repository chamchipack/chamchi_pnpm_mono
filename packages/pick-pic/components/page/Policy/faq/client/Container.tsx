'use client';

// import { useFAQsInfinite } from '@/api/client/faq';
import EmptyDataOverlay from '@/components/common/layout/EmptyDataOverlay';
import useInfiniteScrollObserver from '@/config/utils/hooks/infinite-scroll/useInfiniteScrollObserver';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { useFAQsInfinite } from './fetch';

export default function FAQContainer() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAccordionChange = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const limit = 10;
  const { data, size, setSize, isValidating } = useFAQsInfinite({
    page: 1,
    limit,
  });

  const items = data ? data.flatMap((page) => page.data.items) : [];
  const observerRef = useRef(null);
  const totalPage = Math.ceil((data?.[0]?.data?.totalCount ?? 0) / limit);

  useInfiniteScrollObserver({
    observerRef,
    isValidating,
    currentPage: size,
    totalPage,
    loadMore: () => setSize(size + 1),
  });

  return (
    <div className="max-w-screen-md mx-auto mt-6">
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
          {items.map(({ _id, question, answer }) => {
            const isOpen = expandedId === _id;
            return (
              <div
                key={_id}
                className="border border-gray-200 rounded-lg mb-2 transition-all"
              >
                <button
                  onClick={() => handleAccordionChange(_id)}
                  className="flex justify-between items-center w-full px-4 py-3 text-left focus:outline-none"
                >
                  <span className="font-semibold text-sm md:text-base">
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-sm text-gray-700 whitespace-pre-wrap">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <div className="mt-[50%] h-[200px]">
          <EmptyDataOverlay title="FAQ 목록이 없어요" />
        </div>
      )}
      {size < totalPage && (
        <div ref={observerRef} className="flex justify-center my-4">
          {isValidating && (
            <svg
              className="animate-spin h-6 w-6 text-pink-400"
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l4-4-4-4v4a12 12 0 00-12 12h4z"
              ></path>
            </svg>
          )}
        </div>
      )}
    </div>
  );
}
