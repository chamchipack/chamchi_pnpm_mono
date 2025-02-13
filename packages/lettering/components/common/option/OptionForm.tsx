'use client';
import { useEffect, useState } from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BottomFixed from '../bottom-fixed/BottomFixed';

interface Option {
  name: string;
  type: 'checkbox' | 'number';
}

interface OptionFormProps {
  options: Option[];
  onClickCheck: () => void;
  isCheckable: boolean;
}

export default function OptionForm({
  options,
  isCheckable = false,
  onClickCheck,
}: OptionFormProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, number>
  >(options.reduce((acc, option) => ({ ...acc, [option.name]: 0 }), {}));

  const handleToggle = (name: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: prev[name] === 0 ? 1 : 0, // ✅ 체크 여부 토글
    }));
  };

  const handleIncrement = (name: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: prev[name] + 1,
    }));
  };

  const handleDecrement = (name: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: prev[name] > 0 ? prev[name] - 1 : 0,
    }));
  };

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {options.map((option, index) => {
          const isChecked = selectedOptions[option.name] > 0;

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 2,
                //   backgroundColor: isChecked ? 'rgba(0, 0, 0, 0.1)' : 'transparent', // ✅ 체크 시 배경 변경
                transition: 'background-color 0.2s ease-in-out',
              }}
            >
              {/* 왼쪽 체크박스 & 옵션명 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Checkbox
                  checked={isChecked}
                  onChange={() => handleToggle(option.name)}
                  sx={{
                    color: 'gray',
                    '&.Mui-checked': {
                      color: 'common.main', // ✅ 체크되었을 때 색상 변경
                    },
                  }}
                />
                <Typography fontSize={14}>{option.name}</Typography>
              </Box>

              {/* 오른쪽 숫자 선택 */}
              {option.type === 'number' && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 80, // ✅ 자리수 넘어가도 레이아웃 유지
                  }}
                >
                  <IconButton
                    onClick={() => handleDecrement(option.name)}
                    size="small"
                    disabled={selectedOptions[option.name] === 0}
                    sx={{
                      width: 28,
                      height: 28,
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    fontSize={14}
                    fontWeight="bold"
                    sx={{
                      minWidth: 24, // ✅ 숫자가 커져도 UI가 깨지지 않도록 최소 너비 설정
                      textAlign: 'center',
                    }}
                  >
                    {selectedOptions[option.name]}
                  </Typography>
                  <IconButton
                    onClick={() => handleIncrement(option.name)}
                    size="small"
                    sx={{
                      width: 28,
                      height: 28,
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {isCheckable && (
        <BottomFixed
          isDisabled={!Object.entries(selectedOptions).length ? true : false}
          label="쿠폰 선택하기"
          onClickMove={onClickCheck}
        />
      )}
    </>
  );
}
