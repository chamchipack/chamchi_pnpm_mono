'use client';
import CustomChip from '@/components/common/chip/CustomChip';
import { Box, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';

export default function OrderComponent() {
  const router = useRouter();

  const handleRouter = () => {
    let path = `/application/order-detail?id=${'query'}`;
    const isWebView = handleNavigation({ path: '', status: 'forward' });

    if (!isWebView) return router.push(path);
  };
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* ✅ 첫 줄 - 시간 & 상세내역 버튼 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={12} color="common.gray">
            2025년 3월 1일 오후 12:40
          </Typography>
          <Typography
            onClick={handleRouter}
            fontSize={12}
            fontWeight="bold"
            color="common.gray"
            sx={{
              cursor: 'pointer',
            }}
          >
            상세내역
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flex: 4 }}>
            <Typography fontSize={16} fontWeight="bold">
              스타벅스 강남점
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              경기도 성남시 수정구 성남대로 1237번길 8-21
            </Typography>
            <Typography fontSize={14} color="text.secondary" sx={{ mt: 1 }}>
              상품 이름
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: 90,
              minHeight: 90,
              backgroundColor: 'grey.300',
              borderRadius: 1,
            }}
          />
        </Box>

        <Box>
          <CustomChip title={'제작중'} borderColor="common.main" />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />
    </>
  );
}
