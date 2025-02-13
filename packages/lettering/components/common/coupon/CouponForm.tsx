'use client';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BottomFixed from '../bottom-fixed/BottomFixed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Coupon {
  name: string;
  discount: string;
  description: string;
}

interface CouponFormProps {
  coupons: Coupon[];
  isCheckable?: boolean;
  value?: string | null;
  setValue?: (coupon: string | null) => void;
  onClickCheck: () => void;
}

export default function CouponForm({
  coupons = [],
  isCheckable = false,
  value,
  setValue,
  onClickCheck,
}: CouponFormProps) {
  const handleSelectCoupon = (couponName: string) => {
    if (!isCheckable || !setValue) return;
    setValue(value === couponName ? null : couponName); // ✅ 토글 기능
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {coupons.map((coupon, index) => {
          const isSelected = value === coupon.name;

          return (
            <Box
              key={index}
              sx={{
                width: '100%',
                borderRadius: 2,
                p: 2,
                backgroundColor: isSelected ? 'common.main' : '#FFD3C6', // ✅ 선택된 경우 색상 변경
                color: isSelected ? 'white' : 'black',
                cursor: isCheckable ? 'pointer' : 'default', // ✅ 선택 가능 여부 반영
                transition: 'background-color 0.2s ease-in-out',
                '&:hover': isCheckable
                  ? {
                      backgroundColor: 'common.main',
                      color: 'white',
                    }
                  : {},
              }}
              onClick={() => handleSelectCoupon(coupon.name)}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center', // ✅ 아이콘이 텍스트와 정렬되도록 설정
                }}
              >
                <Typography fontSize={16} fontWeight={'bold'}>
                  {coupon.discount}
                </Typography>

                {/* ✅ 선택된 경우에만 아이콘을 보여줌 */}
                {isSelected && <CheckCircleIcon sx={{ color: 'white' }} />}
              </Box>
              <Typography fontSize={14}>{coupon.name}</Typography>
              <Typography fontSize={12} sx={{ mt: 2 }}>
                {coupon.description}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {isCheckable && (
        <BottomFixed
          isDisabled={!value}
          label="쿠폰 선택하기"
          onClickMove={onClickCheck}
        />
      )}
    </>
  );
}
