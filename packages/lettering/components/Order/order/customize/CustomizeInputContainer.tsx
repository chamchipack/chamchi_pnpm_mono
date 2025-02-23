'use client';
import { Box, Typography } from '@mui/material';
import InputTextField from '../common/InputTextField';
import { useState } from 'react';
import InputSelectBox from '../common/InputSelectBox';
import InputClickableBox from '../common/InputClickableBox';

export default function CustomizeInputContainer() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <>
      <Box>
        <Typography fontSize={14} fontWeight={'bold'} sx={{ mb: 1 }}>
          케이크 문구
        </Typography>
        <InputTextField
          value={inputValue}
          setValue={setInputValue}
          placeholder="케이크에 들어갈 문구를 입력해주세요. 최대 30자"
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography fontSize={14} fontWeight={'bold'} sx={{ mb: 1 }}>
          케이크 맛
        </Typography>
        <InputSelectBox
          value={selectedOption}
          setValue={setSelectedOption}
          options={[
            { label: '옵션 1', value: 'option1' },
            { label: '옵션 2', value: 'option2' },
            { label: '옵션 3', value: 'option3' },
          ]}
          placeholder="옵션을 선택해주세요"
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography fontSize={14} fontWeight={'bold'} sx={{ mb: 1 }}>
          사이즈
        </Typography>
        <InputSelectBox
          value={selectedOption}
          setValue={setSelectedOption}
          options={[
            { label: '옵션 1', value: 'option1' },
            { label: '옵션 2', value: 'option2' },
            { label: '옵션 3', value: 'option3' },
          ]}
          placeholder="옵션을 선택해주세요"
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography fontSize={14} fontWeight={'bold'} sx={{ mb: 1 }}>
          추가 상품
        </Typography>
        <InputSelectBox
          value={selectedOption}
          setValue={setSelectedOption}
          options={[
            { label: '옵션 1', value: 'option1' },
            { label: '옵션 2', value: 'option2' },
            { label: '옵션 3', value: 'option3' },
          ]}
          placeholder="옵션을 선택해주세요"
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography fontSize={14} fontWeight={'bold'} sx={{ mb: 1 }}>
          할인쿠폰
        </Typography>
        <InputClickableBox
          data={[{ label: '쿠폰', value: '' }]}
          isLabelVisable={false}
          type="coupon"
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography fontSize={14} fontWeight={'bold'} sx={{ mb: 1 }}>
          옵션
        </Typography>
        <InputClickableBox
          data={[{ label: '옵션', value: '' }]}
          isLabelVisable={false}
          type="option"
        />
      </Box>
    </>
  );
}
