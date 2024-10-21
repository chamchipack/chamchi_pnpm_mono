'use client';
import { Box, Pagination } from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { PaginationAtom } from './state';

export default function PaginationComponent({ total }: { total: number }) {
  const [pagination, setPagination] = useState({ page: 1, perPage: 5 });
  const [filterState, setFilterState] = useRecoilState(PaginationAtom);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    setFilterState({ page: newPage, perPage: pagination.perPage });
  };

  return (
    <Box sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
      <Pagination
        count={Math.ceil(total / pagination.perPage)}
        page={pagination.page}
        onChange={handlePageChange}
      />
    </Box>
  );
}
