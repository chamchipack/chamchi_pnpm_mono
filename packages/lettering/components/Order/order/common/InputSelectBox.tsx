import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SelectBoxProps {
  value: string;
  setValue: (newValue: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export default function InputSelectBox({
  value,
  setValue,
  options,
  placeholder = '선택해주세요',
}: SelectBoxProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <Select
      fullWidth
      value={value}
      onChange={handleChange}
      displayEmpty
      IconComponent={ExpandMoreIcon} // ✅ 오른쪽 아이콘 변경
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: 'background.default', // ✅ 드롭다운 리스트 배경색 적용
          },
        },
      }}
      sx={{
        height: 40,
        borderRadius: 1, // ✅ 둥글게 변경
        backgroundColor: 'background.default',
      }}
    >
      <MenuItem disabled value="">
        <Typography sx={{ fontSize: 14 }}>{placeholder}</Typography>
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Typography sx={{ fontSize: 14 }}>{option.label}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
}
