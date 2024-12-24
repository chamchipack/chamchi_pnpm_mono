'use client';

import { menuItems } from '@/config/menu/menu';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import isEditPageon from '../state';
import { PaginationAtom, SearchFilterAtom } from './state';
import SearchFilter from './SearchFilter';
import { useClientSize } from 'package/src/hooks/useMediaQuery';
import MenuAtom from '@/components/Layout/Header/client/auth/state';

export default function ListButtonComponent() {
  const [isMounted, setIsMounted] = useState(false);
  const { data } = useSession();
  const ismobile = useClientSize('sm');
  const menu = useRecoilValue(MenuAtom);
  const [filterState, setFilterState] = useRecoilState(SearchFilterAtom);

  const [paginationState, setPaginationState] = useRecoilState(PaginationAtom);
  const path = usePathname();
  const [, setIsEditPageon] = useRecoilState(isEditPageon);

  const [value, setValue] = useState<string>('');

  const handleChange = (newValue: string) => {
    setPaginationState((prev: any) => ({
      ...prev,
      page: 1,
    }));
    setFilterState({
      ...filterState,
      'category.like': newValue,
    });
    setValue(newValue);
  };

  const buttons =
    menu.find(({ path: _path = '' }) => _path === path)?.category || [];

  useEffect(() => {
    setFilterState({
      ...filterState,
      'category.like': '',
    });
    setIsMounted(true); // 클라이언트 사이드에서만 실행
  }, []);

  if (!isMounted)
    return (
      <Box sx={{ mt: 3 }}>
        <Skeleton sx={{ width: '20%', height: 40 }} />
        <Skeleton sx={{ width: '100%', height: 40, mt: 1 }} />
      </Box>
    );

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
