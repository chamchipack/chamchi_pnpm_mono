import { Box, Typography } from '@mui/material';
import InputClickableBox from './InputClickableBox';

type Input = { label: string; value: string }[];
const dummy1: Input = [
  { label: '연락처', value: '010-7650-7023' },
  { label: '주문자', value: '조찬익' },
];

const dummy2: Input = [{ label: '요청사항', value: '' }];

export default function OrderInputContainer() {
  return (
    <>
      <Box sx={{ my: 2 }}>
        <InputClickableBox
          data={dummy1}
          isLabelVisable={true}
          type="text"
          inputRequestTitle="주문자 정보"
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography fontSize={14} fontWeight={'bold'} sx={{ mb: 1 }}>
          요청사항 입력
        </Typography>
        <InputClickableBox
          data={dummy2}
          isLabelVisable={false}
          type="text"
          inputRequestTitle="요청사항 등록"
        />
      </Box>
    </>
  );
}
