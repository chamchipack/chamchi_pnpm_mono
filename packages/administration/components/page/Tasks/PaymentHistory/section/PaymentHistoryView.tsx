'use client';

import { useState } from 'react';
import {
  GridColDef,
  GridPaginationModel,
  GridRowParams,
} from '@mui/x-data-grid';
import PaymentHistoryViewUI from './PaymentHistoryViewUI';
import { Attendance } from '@/lib/type/Attendance';
import Toggle from '@/components/common/Toggle';
import updateStatus from '@/lib/swr/students/updateStatus';

const commonColumnOptions: Partial<GridColDef> = {
  align: 'center',
  headerAlign: 'center',
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
};

interface Props {
  data: Attendance[];
  keyword: string;
  total: number;
  pagination: any;
  setPagination: (v: any) => void;
  statusFilter: boolean | null;
  onKeywordChange: (v: string) => void;
  onStatusChange: (v: boolean | null) => void;
  isLoading: boolean;
  refetch: () => void;
}

export default function PaymentHistoryView(props: Props) {
  const {
    data = [],
    total,
    pagination,
    setPagination,
    statusFilter,
    onKeywordChange,
    onStatusChange,
    isLoading = false,
    refetch,
  } = props;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);

  const [text, setText] = useState('');
  const [selectedHistory, setSelectedHistory] = useState<Attendance | null>(
    null,
  );

  const columns: GridColDef[] = [
    {
      field: 'studentName',
      headerName: '이름',
      width: 130,
      ...commonColumnOptions,
    },
    {
      field: 'paymentDate',
      headerName: '결제일',
      width: 180,
      ...commonColumnOptions,
    },
    {
      field: 'confirmationDate',
      headerName: '결제확정일',
      width: 180,
      ...commonColumnOptions,
    },
    {
      field: 'paymentYearMonth',
      headerName: '결제연월',
      width: 100,
      ...commonColumnOptions,
    },
    {
      field: 'amount',
      headerName: '금액',
      width: 100,
      ...commonColumnOptions,
    },
    {
      field: 'method',
      headerName: '결제방식',
      width: 110,
      ...commonColumnOptions,
      renderCell: (params) => {
        const status = params.value;

        // 상태별 스타일 및 라벨 정의
        const statusConfig = {
          card: {
            label: '카드',
            style: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            dot: 'bg-emerald-500',
          },
          account: {
            label: '계좌',
            style: 'bg-rose-50 text-rose-600 border-rose-100',
            dot: 'bg-rose-500',
          },
          cash: {
            label: '현금',
            style: 'bg-amber-50 text-amber-600 border-amber-100',
            dot: 'bg-amber-500',
          },
          other: {
            label: '기타',
            style: 'bg-blue-50 text-blue-600 border-blue-100',
            dot: 'bg-blue-500',
          },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || {
          label: status,
          style: 'bg-gray-50 text-gray-500 border-gray-100',
          dot: 'bg-gray-400',
        };

        return (
          <div className="flex items-center justify-center h-full">
            <div
              className={`
                flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold tracking-tight
                ${config.style}
              `}
            >
              {/* 상태를 나타내는 작은 점(Dot) */}
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              {config.label}
            </div>
          </div>
        );
      },
    },
    {
      field: 'paymentType',
      headerName: '수강정보',
      ...commonColumnOptions,
      renderCell: (params) => {
        const value = params.value as 'regular' | 'package';

        const isRegular = value === 'regular';

        return (
          <div
            className={`px-2 py-1 rounded-md text-xs border
              ${
                isRegular
                  ? 'bg-main text-white border-main'
                  : 'bg-white text-main border-main'
              }
            `}
          >
            {isRegular ? '정규결제' : '회차결제'}
          </div>
        );
      },
    },
  ];

  const handleRowDoubleClick = (params: GridRowParams<Attendance>) => {
    setSelectedHistory(params.row);
    setDrawerOpen(true);
  };

  const handlePaginationChange = (model: GridPaginationModel) => {
    // setPagination((prev) => ({ ...prev, page: model.page + 1 }));
  };

  return (
    <PaymentHistoryViewUI
      students={data}
      total={total}
      pagination={pagination}
      statusFilter={statusFilter}
      isLoading={isLoading}
      keywordText={text}
      columns={columns}
      drawerOpen={drawerOpen}
      paymentDrawerOpen={paymentDrawerOpen}
      selectedHistory={selectedHistory}
      onTextChange={setText}
      onSearch={() => onKeywordChange(text)}
      onStatusChange={onStatusChange}
      onRowDoubleClick={handleRowDoubleClick}
      onPaginationChange={handlePaginationChange}
      onRefetch={() => refetch()}
      onCloseDrawer={() => {
        setDrawerOpen(false);
        setSelectedHistory(null);
      }}
      onRegisterDrawer={() => {
        setDrawerOpen(true);
        setSelectedHistory(null);
      }}
      onOpenDrawer={() => setDrawerOpen(true)}
      handleChangePage={(n) =>
        setPagination((prev: any) => ({ ...prev, page: n }))
      }
      onSelectMobile={(data) => {
        setSelectedHistory(data);
        setDrawerOpen(true);
      }}
      onSelectMobilePayment={(data) => {
        setSelectedHistory(data);
        setPaymentDrawerOpen(true);
      }}
      openPaymentDrawer={() => setPaymentDrawerOpen(true)}
      closePaymentDrawer={() => {
        setPaymentDrawerOpen(false);
        setSelectedHistory(null);
      }}
    />
  );
}
