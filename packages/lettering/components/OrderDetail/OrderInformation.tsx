'use client';
import { Box, Typography } from '@mui/material';
import CustomChip from '../common/chip/CustomChip';
import { useState } from 'react';
import ModalWrapper from '../common/modal/ModalWrapper';
import { formatDate } from '@/config/utils/time/formatDateAndtime';
import { formatMoney } from '@/config/utils/number/formatMoney';
import { OrderSchema } from '@/types/schema/OrderSchema';

export default function OrderInformation({
  sellerId,
  status,
  createdAt,
  bookingDate,
  orderNumber,
  userId,
  phoneNumber,
  totalPrice,
  paymentMethod,
}: OrderSchema) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Box sx={{}}>
        <Typography fontSize={16} fontWeight="bold">
          {sellerId}
        </Typography>
        <Typography fontSize={12} color="text.secondary">
          경기도 성남시 수정구 성남대로 1237번길 8-21
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <CustomChip status={status} borderColor="common.main" />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ ...flex1 }}>
          <Box sx={{ minWidth: 130 }}>
            <Typography fontSize={12}>주문일시</Typography>
          </Box>
          <Typography fontSize={12} sx={{ color: 'common.gray' }}>
            {formatDate(createdAt)}
          </Typography>
        </Box>

        <Box sx={{ ...flex1 }}>
          <Box sx={{ minWidth: 130 }}>
            <Typography fontSize={12}>완료일시</Typography>
          </Box>
          <Typography fontSize={12} sx={{ color: 'common.gray' }}>
            {formatDate(bookingDate)}
          </Typography>
        </Box>

        <Box sx={{ ...flex1 }}>
          <Box sx={{ minWidth: 130 }}>
            <Typography fontSize={12}>주문번호</Typography>
          </Box>
          <Typography fontSize={12} sx={{ color: 'common.gray' }}>
            {orderNumber}
          </Typography>
        </Box>

        <Box sx={{ ...flex1 }}>
          <Box sx={{ minWidth: 130 }}>
            <Typography fontSize={12}>주문자 이름</Typography>
          </Box>
          <Typography fontSize={12} sx={{ color: 'common.gray' }}>
            {userId}
          </Typography>
        </Box>

        <Box sx={{ ...flex1 }}>
          <Box sx={{ minWidth: 130 }}>
            <Typography fontSize={12}>주문자 연락처</Typography>
          </Box>
          <Typography fontSize={12} sx={{ color: 'common.gray' }}>
            {phoneNumber}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            ...flex2,
          }}
        >
          <Typography fontSize={14} fontWeight={'bold'}>
            결제 금액
          </Typography>
          <Typography fontSize={14}>{formatMoney(totalPrice)}원</Typography>
        </Box>

        <Box
          sx={{
            ...flex2,
            mt: 1,
          }}
        >
          <Typography fontSize={14} fontWeight={'bold'}>
            결제 방법
          </Typography>
          <Typography fontSize={14}>{paymentMethod}</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            fontSize={14}
            color="common.gray"
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
          >
            주문내역 삭제하기
          </Typography>
          {/* <Typography
            fontSize={14}
            color="common.gray"
            sx={{
              cursor: 'pointer',
            }}
          >
            주문 들어가기전 취소하기
          </Typography>
          <Typography
            fontSize={14}
            color="common.gray"
            sx={{
              cursor: 'pointer',
            }}
          >
            혹은 주문 제작이 시작되었어요
          </Typography> */}
        </Box>
      </Box>

      <ModalWrapper
        open={open}
        handleClose={handleClose}
        title="주문내역 삭제"
        content="삭제하실래>"
        onClickCheck={() => {}}
        processing={false}
      ></ModalWrapper>
    </>
  );
}

const flex1 = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
};

const flex2 = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};
