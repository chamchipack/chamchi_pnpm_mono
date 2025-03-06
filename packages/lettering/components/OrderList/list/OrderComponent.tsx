'use client';
import CustomChip from '@/components/common/chip/CustomChip';
import { Box, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { handleNavigation } from '@/config/navigation';
import { formatDate } from '@/config/utils/time/formatDateAndtime';
import { OrderSchema } from '@/types/schema/OrderSchema';

export default function OrderComponent({
  _id = '',
  sellerId = '',
  status,
  productId = '',
  productImage,
  createdAt,
}: OrderSchema) {
  const router = useRouter();

  const handleRouter = () => {
    let path = 'order-detail';

    const param = {
      orderId: _id,
    };

    const isWebView = handleNavigation({
      path,
      status: 'forward',
      params: JSON.stringify(param),
    });

    if (!isWebView) {
      const queryParams = new URLSearchParams(param).toString();
      router.push(`/application/${path}?${queryParams}`);
    }
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
          <Typography fontSize={14} color="common.gray">
            {formatDate(createdAt)}
          </Typography>
          <Typography
            onClick={handleRouter}
            fontSize={14}
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
            <Typography fontSize={18} fontWeight="bold">
              {sellerId}
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              경기도 성남시 수정구 성남대로 1237번길 8-21
            </Typography>
            <Typography fontSize={14} color="text.primary" sx={{ mt: 1 }}>
              {productId}
            </Typography>
          </Box>

          <Box
            component="img"
            src={productImage}
            sx={{
              flex: 1,
              width: 90,
              height: 90,
              backgroundColor: 'grey.300',
              borderRadius: 1,
              objectFit: 'cover', // 이미지 비율 유지하면서 꽉 채우기
            }}
          />
        </Box>

        <Box>
          <CustomChip status={status} borderColor="common.main" />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />
    </>
  );
}
