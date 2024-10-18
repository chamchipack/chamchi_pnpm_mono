'use client';

import { menuItems } from '@/config/menu/menu';
import { Box, Button, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import isEditPageon from '../state';
import SearchFilterAtom from './state';

export default function ListButtonComponent() {
  const { data } = useSession();
  const [filterState, setFilterState] = useRecoilState(SearchFilterAtom);
  const path = usePathname();
  const [, setIsEditPageon] = useRecoilState(isEditPageon);

  const [value, setValue] = useState<string>('');

  const handleChange = (newValue: string) => {
    setFilterState({
      ...filterState,
      'category.like': newValue,
    });
    setValue(newValue);
  };

  const buttons =
    menuItems.find(({ path: _path = '' }) => _path === path)?.category || [];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        mt: 3,
      }}
    >
      <Box
        sx={{
          mb: 1.5,
          borderBottom: (theme) => `1px solid ${theme.palette.text.disabled}`,
          height: 30,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {buttons.map((button) => (
          <Button
            key={button.label}
            sx={{
              mr: 2,
              borderBottom: value === button.label ? '2px solid black' : 'none',
              borderRadius: 0,
            }}
            onClick={() => {
              handleChange(button.label);
            }}
          >
            <Typography
              sx={{ color: value === button.label ? 'black' : 'gray' }}
            >
              {button.name}
            </Typography>
          </Button>
        ))}
      </Box>
      {data && (
        <Button
          variant="outlined"
          size="medium"
          sx={{
            height: 30,
            px: 1,
            py: 0.5,
            mr: 2,
            borderRadius: 1,
            background: (theme) => `${theme.palette.info.main}`,
            borderColor: 'info.main',
            color: 'background.paper',
            '&:hover': {
              borderColor: 'info.dark',
              background: (theme) => `${theme.palette.info.dark}`,
            },
          }}
          onClick={() => {
            setIsEditPageon(true);
          }}
        >
          새로운 글 등록
        </Button>
      )}
    </Box>
  );
}
