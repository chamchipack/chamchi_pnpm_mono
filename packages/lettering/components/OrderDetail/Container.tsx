import { Box } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import OrderInformation from './OrderInformation';

interface Props {
  orderId: string;
}

export default function Container({ orderId = '' }: Props) {
  console.log(orderId);
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2.5 }}>
          <HeadComponent isButtonVisable={true} title="주문 상세내역" />
        </Box>

        <Box sx={{ px: 2.5, mt: 3 }}>
          <OrderInformation />
        </Box>
      </Box>
    </>
  );
}
