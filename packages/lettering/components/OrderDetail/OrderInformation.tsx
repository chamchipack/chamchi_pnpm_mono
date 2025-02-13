'use client';
import { Box, Typography } from '@mui/material';
import CustomChip from '../common/chip/CustomChip';
import { useState } from 'react';
import ModalWrapper from '../common/modal/ModalWrapper';

export default function OrderInformation() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Box sx={{}}>
        <Typography fontSize={16} fontWeight="bold">
          스타벅스 강남점
        </Typography>
        <Typography fontSize={12} color="text.secondary">
          경기도 성남시 수정구 성남대로 1237번길 8-21
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <CustomChip title="픽업완료" borderColor="common.main" />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ ...flex1 }}>
          <Box sx={{ minWidth: 130 }}>
            <Typography fontSize={12}>주문일시</Typography>
          </Box>
          <Typography fontSize={12} sx={{ color: 'common.gray' }}>
            2025년 3월 1일 오후 12:40
          </Typography>
        </Box>

        <Box sx={{ ...flex1 }}>
          <Box sx={{ minWidth: 130 }}>
            <Typography fontSize={12}>주문번호</Typography>
          </Box>
          <Typography fontSize={12} sx={{ color: 'common.gray' }}>
            1758480430
          </Typography>
        </Box>

        <Box sx={{ ...flex1 }}>
          <Box sx={{ minWidth: 130 }}>
            <Typography fontSize={12}>주문자 이름</Typography>
          </Box>
          <Typography fontSize={12} sx={{ color: 'common.gray' }}>
            조찬익
          </Typography>
        </Box>

        <Box sx={{ ...flex1 }}>
          <Box sx={{ minWidth: 130 }}>
            <Typography fontSize={12}>주문자 연락처</Typography>
          </Box>
          <Typography fontSize={12} sx={{ color: 'common.gray' }}>
            010-7650-7023
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
          <Typography fontSize={14}>25,000원</Typography>
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
          <Typography fontSize={14}>카카오페이</Typography>
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
