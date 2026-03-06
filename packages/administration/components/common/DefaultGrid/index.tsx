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
        sx={{
          // 10개가 적절히 보이도록 높이 조정 (한 행당 약 60px 기준)
          height: 'auto',
          minHeight: 650,
          border: 'none',
          backgroundColor: '#f8fafc',
          padding: '16px',
          borderRadius: '2.5rem',

          // 1. 헤더: 더 미니멀하고 가볍게
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'transparent',
            borderBottom: 'none',
            color: '#94a3b8',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },

          // 2. 가상화 컨테이너 여백 조정
          '& .MuiDataGrid-virtualScrollerContent': {
            // padding: '2px 0',
          },

          // 3. 행(Row): 10개가 다 보이도록 간격(mb)과 높이 최적화
          '& .MuiDataGrid-row': {
            border: '1px solid #f1f5f9',
            borderRadius: '18px', // 곡률을 살짝 줄여 공간 효율 높임
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            transition: 'all 0.2s ease-in-out', // 애니메이션을 더 빠르고 차분하게
            cursor: 'pointer',

            // Hover 효과 축소: 살짝만 강조
            '&:hover': {
              backgroundColor: '#ffffff !important',
              transform: 'translateY(-2px)', // 4px -> 2px로 축소
              boxShadow: '0 8px 16px -4px rgba(0,0,0,0.08)', // 그림자 강도 약화
              borderColor: '#e2e8f0',
              zIndex: 1,
            },
          },

          // 4. 선택된 행: 과하지 않은 포인트
          '& .MuiDataGrid-row.Mui-selected': {
            // 테두리와 그림자를 없애고 부드러운 배경색만 적용
            backgroundColor: '#f1f5f9 !important', // 연한 슬레이트 블루/그레이 톤
            border: 'none',
            boxShadow: 'none',

            '& .MuiDataGrid-cell': {
              color: '#334155', // 텍스트 컬러를 조금 더 진한 슬레이트로 변경
              fontWeight: 700, // 폰트 두께로 선택 상태 강조
            },

            '&:hover': {
              backgroundColor: '#e2e8f0 !important', // 호버 시에는 한 단계 더 짙은 배경
            },
          },

          // 5. 셀(Cell): 높이 밀도 조정
          '& .MuiDataGrid-cell': {
            borderBottom: 'none !important',
            py: 1, // 패딩 축소 (가독성 유지하며 높이 절약)
            px: 3,
            display: 'flex',
            alignItems: 'center',
            fontSize: '13px',
            color: '#1e293b',
          },

          // 6. 기타 요소 정리
          '& .MuiDataGrid-columnSeparator': { display: 'none' },
          '& .MuiDataGrid-footerContainer': { borderTop: 'none' },

          // 스크롤바 (필요 시에만 아주 얇게 노출)
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: '#e2e8f0',
            borderRadius: '10px',
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
