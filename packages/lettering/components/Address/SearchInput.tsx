import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  handleRouter: () => void;
  isUsable: boolean;
}

export default function SearchInput({
  handleRouter,
  isUsable = false,
}: SearchInputProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="검색어를 입력하세요"
      size="small"
      sx={{ my: 1, mb: 2 }}
      onClick={handleRouter}
      InputProps={{
        readOnly: !isUsable,
        sx: {
          borderRadius: 2,
          height: 45,
          paddingRight: 1,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'common.gray' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'common.main',
            borderWidth: '2px',
          },
          '& input::placeholder': {
            fontSize: '14px',
            color: 'common.gray',
            opacity: 0.7,
          },
        },
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon sx={{ fontSize: 24, color: 'gray' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
