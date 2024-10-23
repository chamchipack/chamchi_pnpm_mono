'use client';

import { menuItems } from '@/config/menu/menu';
import { Box, Button, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import isEditPageon from '../state';
import { PaginationAtom, SearchFilterAtom } from './state';
import SearchFilter from './SearchFilter';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import MenuAtom from '@/components/Layout/Header/client/auth/state';

export default function ListButtonComponent() {
  const { data } = useSession();
  const ismobile = useClientSize('sm');
  const menu = useRecoilValue(MenuAtom);
  const [filterState, setFilterState] = useRecoilState(SearchFilterAtom);

  // const [paginationState, setPaginationState] = useRecoilState(PaginationAtom);
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
    menu.find(({ path: _path = '' }) => _path === path)?.category || [];

  return (
    <>
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
          {buttons.map((button: any) => (
            <Button
              key={button.label}
              sx={{
                mr: 2,
                borderBottom:
                  value === button.label ? '2px solid black' : 'none',
                borderRadius: 0,
              }}
              onClick={() => {
                handleChange(button.label);
                // setPaginationState({ page: 1, perPage: 5 });
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
            variant="contained"
            size="medium"
            sx={{
              height: 30,
              px: 1.5,
              py: 0.5,
              mr: 1,
              borderRadius: 2,
              background: (theme) => `${theme.palette.common.black}`,
              color: 'background.paper',
              '&:hover': {
                background: (theme) => `${theme.palette.grey[400]}`,
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
      {ismobile && <SearchFilter />}
    </>
  );
}
