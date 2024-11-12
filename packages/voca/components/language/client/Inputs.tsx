import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

interface Props {
  value: any;
  label: string;
  onChangeItem: (key: string, data: any) => void;
  dataKey: string;
}

export default function LabelAndInputs({ ...props }: Props) {
  return (
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
        {props?.label}
      </Typography>

      <TextField
        variant="outlined"
        fullWidth
        autoFocus
        value={props?.value}
        onChange={(e) => props?.onChangeItem(props?.dataKey, e.target.value)}
        sx={{
          width: '70%',
          // flexGrow: 1, // 남은 공간을 채우도록 설정
          height: 40,
          backgroundColor: 'grey.200',
          color: 'common.black',
          borderRadius: 4,
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
  );
}
