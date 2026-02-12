'use client';

import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { Pagination } from '@mui/material';

interface DefaultGridProps extends Omit<DataGridProps, 'paginationModel'> {
  total: number;
  page: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

const DefaultGrid = ({
  total,
  page,
  perPage,
  onPageChange,
  sx,
  ...props
}: DefaultGridProps) => {
  return (
    <div>
      <DataGrid
        paginationMode="server"
        rowCount={total}
        paginationModel={{
          page,
          pageSize: perPage,
        }}
        hideFooterPagination
        disableRowSelectionOnClick
        sx={{
          height: 680,
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: (theme) => theme.palette.primary.light,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.light,
            },
          },
          ...sx,
        }}
        {...props}
      />

      <div className="flex justify-center mt-1">
        <Pagination
          count={Math.ceil(total / perPage)}
          page={page}
          onChange={(e, newPage) => onPageChange(newPage)}
        />
      </div>
    </div>
  );
};

export default React.memo(DefaultGrid);
