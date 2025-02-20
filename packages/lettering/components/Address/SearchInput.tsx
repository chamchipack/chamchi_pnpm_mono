import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface SearchInputProps {
  handleSearchQuery?: (query: string) => void;
  isUsable: boolean;
  handleRouter?: () => void;
}

export default function SearchInput({
  handleSearchQuery,
  isUsable = true,
  handleRouter,
}: SearchInputProps) {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    if (!isUsable) return;

    if (query.trim() && handleSearchQuery) {
      handleSearchQuery(query);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isUsable) return;
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="검색어를 입력하세요"
      size="small"
      sx={{ my: 1, mb: 2 }}
      onChange={(e) => {
        if (!isUsable) return;
        setQuery(e.target.value);
      }}
      onBlur={(e) => e.target.blur()}
      onKeyDown={handleKeyDown}
      onClick={() => {
        if (!isUsable && handleRouter) handleRouter();
      }}
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
            <IconButton onClick={handleSearch}>
              <SearchIcon sx={{ fontSize: 24, color: 'gray' }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
