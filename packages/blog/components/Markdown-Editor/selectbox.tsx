import { menuItems } from '@/config/menu/menu';
import { ArrowDropDown } from '@mui/icons-material';
import { FormControl, MenuItem, Select, styled } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CustomSelect = styled(Select)(({ theme }) => ({
  '&.MuiInputBase-root': {
    border: 'none', // 보더를 없앱니다.
    borderRadius: 0,
  },
  '& .MuiSelect-select': {
    paddingRight: theme.spacing(4),
    marginRight: 10,
  },
  '& .MuiSelect-icon': {
    right: theme.spacing(1),
    color: theme.palette.text.primary, // 아이콘 색상
  },
}));

export default function ModernSelectBox({ ...props }: Props) {
  const path = usePathname();
  const buttons =
    menuItems.find(({ path: _path = '' }) => path.includes(_path))?.category ||
    [];

  const [value, setValue] = React.useState(props.category || "");

  const handleChange = (event: any) => {
    props?.setCategory(event.target.value);
    setValue(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 200}}>
      <CustomSelect
        value={value}
        onChange={handleChange}
        IconComponent={ArrowDropDown} // MUI 아이콘 화살표를 사용합니다.
        disableUnderline // 언더라인을 없앱니다.
        displayEmpty
        renderValue={
          value !== ''
            ? undefined
            : () => <span style={{ color: '#aaa' }}>선택 없음</span>
        }
      >
        {buttons.map((button) => (
          <MenuItem key={button.label} value={button.label} sx={{
            background: "white",
          }}>
            {button.name}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
}
