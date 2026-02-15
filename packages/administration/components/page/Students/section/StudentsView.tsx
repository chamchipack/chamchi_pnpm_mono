'use client';

import { useState } from 'react';
import {
  GridColDef,
  GridPaginationModel,
  GridRowParams,
} from '@mui/x-data-grid';
import StudentsViewUI from './StudentsViewUI';
import { Student } from '@/lib/type/Student';
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
  students: Student[];
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

export default function StudentsView(props: Props) {
  const {
    students = [],
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
  const [text, setText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '이름',
      width: 130,
      ...commonColumnOptions,
    },
    {
      field: 'enrollmentDate',
      headerName: '등록일',
      width: 110,
      ...commonColumnOptions,
    },
    // { field: 'type', headerName: '수강 타입', width: 100, align: 'center' },
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
    {
      field: 'currentStatus',
      headerName: '등록상태',
      type: 'string',
      width: 100,
      ...commonColumnOptions,
      renderCell: ({ row: { id, currentStatus = false } = {} }) => (
        <Toggle
          isOn={currentStatus}
          onClick={async () => {
            try {
              await updateStatus(id, !currentStatus);

              refetch();
            } catch {}
          }}
        />
      ),
    },
    {
      field: 'lastPaymentDate',
      headerName: '최근결제일',
      width: 150,
      ...commonColumnOptions,
      renderCell: ({ row: { regularPayment = {} } = {} }) => {
        return regularPayment?.lastPaymentDate ?? '-';
      },
    },
    {
      field: 'regularPayment',
      headerName: '다음 예상결제일',
      width: 150,
      ...commonColumnOptions,
      renderCell: ({ row: { regularPayment = {} } = {} }) => {
        return regularPayment?.nextDueDate ?? '-';
      },
    },
    { field: 'lessonBasePayment', headerName: '회차 결제여부', flex: 1 },
  ];

  const handleRowDoubleClick = (params: GridRowParams<Student>) => {
    setSelectedStudent(params.row);
    setDrawerOpen(true);
  };

  const handlePaginationChange = (model: GridPaginationModel) => {
    // setPagination((prev) => ({ ...prev, page: model.page + 1 }));
  };

  return (
    <StudentsViewUI
      students={students}
      total={total}
      pagination={pagination}
      statusFilter={statusFilter}
      isLoading={isLoading}
      keywordText={text}
      columns={columns}
      drawerOpen={drawerOpen}
      selectedStudent={selectedStudent}
      onTextChange={setText}
      onSearch={() => onKeywordChange(text)}
      onStatusChange={onStatusChange}
      onRowDoubleClick={handleRowDoubleClick}
      onPaginationChange={handlePaginationChange}
      onCloseDrawer={() => {
        setDrawerOpen(false);
        setSelectedStudent(null);
      }}
      onRegisterDrawer={() => {
        setDrawerOpen(true);
        setSelectedStudent(null);
      }}
      onOpenDrawer={() => setDrawerOpen(true)}
      handleChangePage={(n) =>
        setPagination((prev: any) => ({ ...prev, page: n }))
      }
      onSelectMobile={(student) => {
        setSelectedStudent(student);
        setDrawerOpen(true);
      }}
    />
  );
}
