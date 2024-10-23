'use client';
import { Box, Pagination } from '@mui/material';

interface Props {
  total: number;
  pagination: { page: number; perPage: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; perPage: number }>
  >;
}

export default function PaginationComponent({
  total,
  pagination,
  setPagination,
}: Props) {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
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
