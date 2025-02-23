import { TextField, Typography } from '@mui/material';
import Box from '@mui/system/Box';

interface InputTextFieldProps {
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  inputMaxLength?: number;
  isMaxLengthOn?: boolean;
}

export default function InputTextField({
  value,
  setValue,
  placeholder = '문구를 입력해주세요',
  inputMaxLength = 30,
  isMaxLengthOn = false,
}: InputTextFieldProps) {
  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ maxLength: inputMaxLength }}
        // rows={4}
        // multiline
        sx={{
          height: 40,
          borderRadius: 1, // ✅ 둥글게 변경
          '& .MuiOutlinedInput-root': {
            height: 40,
            borderRadius: 1, // ✅ 내부도 둥글게
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.2)', // 기본 테두리 색상 (연한 회색)
            },
            '&:hover fieldset': {
              borderColor: 'gray', // ✅ 호버 시 테두리 색상 변경
            },
            '&.Mui-focused fieldset': {
              borderColor: 'common.gray', // ✅ 포커스 시 검은색 테두리
              borderWidth: 2, // ✅ 테두리를 두껍게 설정
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '4px 10px', // ✅ 내부 여백 조정
          },
        }}
      />
      {isMaxLengthOn && (
        <Typography
          fontSize={12}
          color="text.secondary"
          sx={{ mt: 1, textAlign: 'right' }}
        >
          {value.length}/{inputMaxLength}
        </Typography>
      )}
    </Box>
  );
}
