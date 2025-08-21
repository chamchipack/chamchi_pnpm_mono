'use client';

import { selectedProductAtom } from '@/store/orderStore/order-info';
import { ProductOptions } from '@/types/schema/ProductSchema';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const EtcOptionSelector = ({ options }: { options: ProductOptions[] }) => {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [orderInfo, setOrderInfo] = useRecoilState(selectedProductAtom);

  useEffect(() => {
    const initialSelected: Record<number, string> = {};
    options.forEach((group, index) => {
      const existing = orderInfo?.options?.[group.title];
      if (
        existing &&
        existing.type === 'etc' &&
        group.options?.some((opt) => opt._id === existing._id)
      ) {
        initialSelected[index] = existing._id;
      }
    });
    setSelected(initialSelected);
  }, [options, orderInfo]);

  const handleChange = (groupIndex: number, optionId: string) => {
    const group = options[groupIndex];
    const selectedOption = group.options?.find((opt) => opt._id === optionId);
    setSelected((prev) => ({ ...prev, [groupIndex]: optionId }));

    setOrderInfo((prev: any) => {
      const prevValue = prev?.options?.[group.title]?.value || 0;
      return {
        ...prev,
        options: {
          ...(prev?.options || {}),
          [group.title]: {
            name: selectedOption?.content,
            value: selectedOption?.price,
            _id: selectedOption?._id,
            type: 'etc',
          },
        },
        totalPrice:
          (prev?.totalPrice || 0) - prevValue + (selectedOption?.price || 0),
        price: (prev?.price || 0) - prevValue + (selectedOption?.price || 0),
      };
    });
  };

  return (
    <>
      {options.map((group, index) => {
        const isEmpty = !selected[index];

        return (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-bold">{group.title}</p>
              {isEmpty && (
                <p className="text-xs text-red-500">필수 입력값입니다</p>
              )}
            </div>
            <Select
              value={selected[index] || ''}
              fullWidth
              displayEmpty
              onChange={(e: SelectChangeEvent<string>) =>
                handleChange(index, e.target.value)
              }
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'background.default',
                  },
                },
              }}
              sx={{
                height: 40,
                borderRadius: 1,
                backgroundColor: 'background.default',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid gray',
                },
              }}
            >
              <MenuItem disabled value="">
                <Typography sx={{ fontSize: 14 }}>
                  옵션을 선택해주세요
                </Typography>
              </MenuItem>
              {group.options?.map((opt) => (
                <MenuItem key={opt._id} value={opt._id}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography fontSize={14} fontWeight="bold">
                      {opt.content}
                    </Typography>
                    <Typography fontSize={14}>
                      +{opt.price.toLocaleString()}원
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(EtcOptionSelector);
