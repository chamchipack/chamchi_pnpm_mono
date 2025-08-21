'use client';

import { selectedProductAtom } from '@/store/orderStore/order-info';
import React from 'react';
import { useRecoilState } from 'recoil';

interface SelectBoxProps {
  value: string;
  setValue: (newValue: string) => void;
  options: {
    label?: string;
    name?: string;
    value: number;
    _id: string;
  }[];
  groupkey: string;
  placeholder?: string;
}

export default function InputSelectBox({
  value,
  setValue,
  options,
  placeholder = '선택해주세요',
  groupkey,
}: SelectBoxProps) {
  const [orderinfo, setOrderInfo] = useRecoilState(selectedProductAtom);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;

    if (selectedId === '') {
      setValue('');
      setOrderInfo((prev: any) => {
        if (!prev) return prev;
        const updatedOptions = { ...(prev.options || {}) };

        const removedOption = updatedOptions[groupkey];
        const removedPrice = removedOption?.value || 0;

        delete updatedOptions[groupkey];

        return {
          ...prev,
          options: updatedOptions,
          totalPrice: (prev.totalPrice || 0) - removedPrice,
          price: (prev.price || 0) - removedPrice,
        };
      });
      return;
    }

    const selectedOption = options.find((opt) => opt._id === selectedId);
    if (!selectedOption) return;

    setValue(selectedId);
    setOrderInfo((prev: any) => {
      if (!prev) return prev;

      const prevOption = prev.options?.[groupkey];
      const prevPrice = prevOption?.value || 0;

      return {
        ...prev,
        options: {
          ...(prev.options || {}),
          [groupkey]: selectedOption,
        },
        totalPrice: (prev.totalPrice || 0) - prevPrice + selectedOption.value,
        price: (prev.price || 0) - prevPrice + selectedOption.value,
      };
    });
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {value && <option value="">선택 취소</option>}

      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.label || option.name} (+{option.value.toLocaleString()}원)
        </option>
      ))}
    </select>
  );
}
