'use client';

import { SearchFilterValue } from '@/types/schema/SearchSchema';
import { Check } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CommonSwipeableDrawer from '../backdrop/CommonSwipeableDrawer';

type Filter = { value: SearchFilterValue; label: string };

interface ListFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  value: Filter;
  setValue: (value: Filter) => void;
  items: Filter[];
}

export default function ListFilterDrawer({
  open,
  onClose,
  onOpen,
  value,
  setValue,
  items,
}: ListFilterDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <CommonSwipeableDrawer
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      maxHeight="50vh"
      minHeight="50vh"
    >
      <div className="pt-4 px-2 flex flex-col justify-between h-full">
        {/* 타이틀 */}
        <div>
          <div className="flex justify-center pb-3">
            <p className="text-sm font-bold text-black">리스트 정렬</p>
          </div>

          {/* 항목 리스트 */}
          <div className="flex flex-col gap-2 py-4">
            {items.map((item, index) => (
              <button
                key={index}
                className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 transition text-left"
                onClick={() => {
                  const current = new URLSearchParams(
                    Array.from(searchParams.entries()),
                  );
                  if (item.value) current.set('order', item.value);
                  else current.delete('order');
                  setValue(item);
                  router.replace(`${pathname}?${current.toString()}`);
                }}
              >
                <span
                  className={`text-sm ${
                    value.value === item.value
                      ? 'text-blue-600 font-bold'
                      : 'text-gray-900'
                  }`}
                >
                  {item.label}
                </span>
                {value.value === item.value && (
                  <Check className="w-6 h-6 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 닫기 버튼 */}
        <div className="flex justify-center pb-8">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-gray-400 hover:text-black transition"
          >
            닫기
          </button>
        </div>
      </div>
    </CommonSwipeableDrawer>
  );
}
