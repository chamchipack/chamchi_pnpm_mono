'use client';

import { selectedProductAtom } from '@/store/orderStore/order-info';
import { ProductOptions } from '@/types/schema/ProductSchema';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function TextInputOption({ options }: { options: ProductOptions[] }) {
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});
  const [orderInfo, setOrderInfo] = useRecoilState(selectedProductAtom);

  // 초기값 설정
  useEffect(() => {
    const inputs: Record<string, string> = {};
    options.forEach((group) => {
      const existing = orderInfo?.options?.[group.title];
      if (existing && existing.type === 'text' && existing._id === group._id) {
        inputs[group._id] = existing.name || '';
      }
    });
    setCustomInputs(inputs);
  }, [options, orderInfo]);

  // 변경 핸들러 (메모이제이션)
  const handleChange = useCallback(
    (group: ProductOptions) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setCustomInputs((prev) => ({ ...prev, [group._id]: text }));
      setOrderInfo((prev: any) => ({
        ...prev,
        options: {
          ...(prev?.options || {}),
          [group.title]: {
            name: text,
            value: 0,
            _id: group._id,
            type: 'text',
          },
        },
      }));
    },
    [setOrderInfo],
  );

  return (
    <div className="space-y-6 my-6">
      {options.map((group) => {
        const value = customInputs[group._id] || '';
        const isEmpty = !value.trim();

        return (
          <div key={group._id}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold">{group.title}</span>
              {isEmpty && (
                <span className="text-xs text-red-500">필수 입력값입니다</span>
              )}
            </div>
            <input
              type="text"
              placeholder={`${group.title} 입력`}
              value={value}
              onChange={handleChange(group)}
              className="w-full h-10 px-3 rounded-md bg-gray-100 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(TextInputOption);
