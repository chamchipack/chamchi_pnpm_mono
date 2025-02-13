'use client';
import CouponForm from '@/components/common/coupon/CouponForm';
import DrawerForm from '@/components/common/modal/DrawerForm';
import OptionForm from '@/components/common/option/OptionForm';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import DrawerInputForm from './DrawerInputForm';

const coupon = [
  {
    name: '생일 할인',
    discount: '10,000원',
    description: '생일 축하 기념 할인 쿠폰',
  },
  {
    name: '첫 구매 할인',
    discount: '5,000원',
    description: '첫 구매 시 사용 가능한 쿠폰',
  },
  {
    name: 'VIP 회원 할인',
    discount: '5,000원',
    description: 'VIP 회원 전용 할인 쿠폰',
  },
];

interface Props {
  data: { label: string; value: string }[];
  onClick?: () => void;
  isLabelVisable: boolean;
  type: 'text' | 'coupon' | 'option';
}

export default function InputClickableBox({
  data = [],
  onClick,
  isLabelVisable = false,
  type = 'text',
}: Props) {
  const [open, setOpen] = useState(false);

  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  // ✅ inputValues를 객체로 저장 (label을 key로 사용)
  const [inputValues, setInputValues] = useState<Record<string, string>>(
    data.reduce((acc, item) => ({ ...acc, [item.label]: item.value }), {}),
  );

  const onClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden'; // ✅ html에도 적용
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // ✅ 모바일 스크롤 방지
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [open]);
  

  return (
    <>
      {/* 클릭 가능한 Box */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
          padding: 2,
          position: 'relative',
          '&:hover': { cursor: 'pointer' },
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '95%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {data.map((item, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography fontSize={14} color="text.primary">
                  {item.label}
                </Typography>

                {isLabelVisable ? (
                  <Typography
                    fontSize={14}
                    fontWeight="bold"
                    noWrap // ✅ 한 줄에서 벗어나면 자동으로 ... 처리
                    sx={{
                      maxWidth: 150, // ✅ 최대 너비 지정
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {inputValues[item.label] || item.value}
                  </Typography>
                ) : (
                  <>
                    {inputValues[item.label] || selectedCoupon ? (
                      <CheckCircleIcon sx={{ color: 'info.main' }} />
                    ) : (
                      ''
                    )}
                  </>
                )}
              </Box>
            ))}
          </Box>
          <ArrowForwardIosIcon
            sx={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 14,
              color: 'gray',
            }}
          />
        </Box>
      </Box>

      {/* ✅ Drawer 내부에 `DrawerInputForm` 적용 */}
      <DrawerForm
        open={open}
        onClose={onClose}
        minHeight="40vh"
        maxHeight="60vh"
      >
        {type === 'text' && (
          <DrawerInputForm
            data={data}
            inputValues={inputValues}
            setInputValues={setInputValues}
            onClose={onClose}
          />
        )}
        {type === 'coupon' && (
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography fontWeight="bold">쿠폰 선택</Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <CouponForm
              coupons={coupon}
              isCheckable={true}
              value={selectedCoupon}
              setValue={setSelectedCoupon}
              onClickCheck={onClose}
            />
          </Box>
        )}

        {type === 'option' && (
          <Box sx={{ p: 2 }}>
            <OptionForm
              isCheckable={true}
              onClickCheck={() => {}}
              options={[
                { name: '추가 토핑', type: 'checkbox' },
                { name: '초코 시럽', type: 'checkbox' },
                { name: '케이크 크기 업그레이드', type: 'number' },
                { name: '음료 추가', type: 'number' },
              ]}
            />
          </Box>
        )}
      </DrawerForm>
    </>
  );
}
