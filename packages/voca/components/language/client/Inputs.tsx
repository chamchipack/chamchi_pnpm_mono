import React, { useEffect, useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

type LanguageType = 'ko' | 'jp' | 'en' | 'kana' | 'none';

interface Props {
  value: any;
  label: string;
  onChangeItem: (key: string, data: any) => void;
  dataKey: string;
  languageType: LanguageType;
}

export default function LabelAndInputs({ ...props }: Props) {
  const [inputValue, setInputValue] = useState(props?.value || '');

  const validateInput = (type: LanguageType, value: string) => {
    if (type === 'none') return true;

    const regexMap = {
      jp: /^[\u3040-\u30FF\u4E00-\u9FFF]*$/, // 일본어 한자 + 가나
      ko: /^[\uAC00-\uD7A3\u3131-\u318E\u1100-\u11FF\s,]*$/,
      kana: /^[\u3040-\u309F\u30A0-\u30FF]*$/,
      en: /^[a-zA-Z]*$/, // 알파벳
    };

    // 해당 언어 유형의 정규식 가져오기
    const regex = regexMap[type];

    // 정규식이 없거나 일치하지 않으면 false 반환
    if (!regex) return false;

    // 입력값이 정규식과 일치하면 true 반환
    return regex.test(value);
  };

  // value가 변경되면 inputValue를 업데이트
  useEffect(() => {
    setInputValue(props?.value || '');
  }, [props?.value]);

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
        value={inputValue}
        onChange={(e) => {
          const inputValue = e.target.value;

          if (validateInput(props?.languageType, inputValue)) {
            setInputValue(inputValue);
            props?.onChangeItem(props?.dataKey, e.target.value);
          }
        }}
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
