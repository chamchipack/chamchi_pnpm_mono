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
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);

  const [text, setText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '이름',
      width: 200,
      ...commonColumnOptions,
    },
    {
      field: 'price',
      headerName: '가격',
      width: 110,
      ...commonColumnOptions,
    },
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
      paymentDrawerOpen={paymentDrawerOpen}
      selectedStudent={selectedStudent}
      onTextChange={setText}
      onSearch={() => onKeywordChange(text)}
      onStatusChange={onStatusChange}
      onRowDoubleClick={handleRowDoubleClick}
      onPaginationChange={handlePaginationChange}
      onRefetch={() => refetch()}
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
      onSelectMobilePayment={(student) => {
        setSelectedStudent(student);
        setPaymentDrawerOpen(true);
      }}
      openPaymentDrawer={() => setPaymentDrawerOpen(true)}
      closePaymentDrawer={() => {
        setPaymentDrawerOpen(false);
        setSelectedStudent(null);
      }}
    />
  );
}
