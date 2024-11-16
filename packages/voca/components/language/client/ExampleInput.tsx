import React from 'react';
import { TextField, Typography, Box, IconButton } from '@mui/material';

interface Props {
  value1: any;
  value2: any;
  index: number;
  //   label: string;
  onChangeExample: (key: string, index: number, value: any) => void;
  //   dataKey: string;
}

export default function ExampleInputs({ ...props }: Props) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: 1,
          gap: 1,
          width: '100%',
        }}
      >
        <Typography
          variant="caption"
          color="text.primary"
          sx={{ flexShrink: 0 }} // 라벨은 고정 크기로 유지
        >
          원어
        </Typography>

        <TextField
          variant="outlined"
          fullWidth
          autoFocus
          value={props?.value2}
          onChange={(e) => {
            const inputValue = e.target.value;
            const japaneseRegex = /^[\u3040-\u30FF\u4E00-\u9FFF]*$/;

            if (japaneseRegex.test(inputValue))
              props?.onChangeExample('jp', props?.index, inputValue);
          }}
          sx={{
            width: '70%',
            // flexGrow: 1, // 남은 공간을 채우도록 설정
            height: 30,
            backgroundColor: 'grey.200',
            color: 'common.black',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              height: '100%',
              borderRadius: 1,
              border: 'none',
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: 1,
          gap: 1,
          width: '100%',
        }}
      >
        <Typography
          variant="caption"
          color="text.primary"
          sx={{ flexShrink: 0 }} // 라벨은 고정 크기로 유지
        >
          한국어
        </Typography>

        <TextField
          variant="outlined"
          fullWidth
          autoFocus
          value={props?.value1}
          onChange={(e) =>
            props?.onChangeExample('ko', props?.index, e.target.value)
          }
          sx={{
            width: '70%',
            // flexGrow: 1, // 남은 공간을 채우도록 설정
            height: 30,
            backgroundColor: 'grey.200',
            color: 'common.black',
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              height: '100%',
              borderRadius: 1,
              border: 'none',
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
      </Box>
    </>
  );
}
