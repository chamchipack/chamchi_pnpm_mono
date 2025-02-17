import { Box, Card, CardContent, Typography } from '@mui/material';
import OrderComponent from './OrderComponent';
import OrderEmptyComponent from './OrderEmptyComponent';

const dummy = [
  { _id: 'wdfaojok111', name: '1111' },
  { _id: 'etgpbkm222', name: '2222' },
  { _id: 'zxcijnp333', name: '3333' },
  { _id: 'qqqqq444', name: '4444' },
  { _id: 'wwwww5555', name: '5555' },
  { _id: 'rtrt666666', name: '66666' },
];
export default function ListContainer() {
  return (
    <>
      <Box
        sx={{
          my: 2,
        }}
      >
        {/* <OrderEmptyComponent /> */}
        {dummy.map((item, index) => (
          <Box key={index} sx={{ my: 4 }}>
            <OrderComponent orderId={item._id} name={item.name} />
          </Box>
        ))}
      </Box>
    </>
  );
}
