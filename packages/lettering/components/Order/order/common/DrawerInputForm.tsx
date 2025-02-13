import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputTextField from './InputTextField';

interface DrawerInputFormProps {
  data: { label: string; value: string }[];
  inputValues: Record<string, string>;
  setInputValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onClose: () => void;
}

export default function DrawerInputForm({
  data,
  inputValues,
  setInputValues,
  onClose,
}: DrawerInputFormProps) {
  const handleInputChange = (label: string, newValue: string) => {
    setInputValues((prev: Record<string, string>) => ({
      ...prev,
      [label]: newValue,
    }));
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', height: '100%', py: 1 }}
    >
      {/* 상단 타이틀 + 닫기 버튼 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          pt: 2,
        }}
      >
        <Typography fontWeight="bold">정보 수정</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* 입력 필드 목록 */}
      <Box sx={{ px: 2, mt: 2 }}>
        {data.map((item, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <Typography fontSize={14} fontWeight="bold" sx={{ mb: 1 }}>
              {item.label}
            </Typography>
            <InputTextField
              value={inputValues[item.label] || ''}
              setValue={(newValue) => handleInputChange(item.label, newValue)}
              placeholder="문구를 입력해주세요. 최대 30자"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
