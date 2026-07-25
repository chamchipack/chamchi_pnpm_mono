'use client';

import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
} from '@mui/x-data-grid';
import { Search } from 'lucide-react';
import Title from '@/components/common/layout/Title/Title';
import CommonSwipeableDrawer from '@/components/common/backdrop/CommonSwipeableDrawer';
import StudentCardList from './StudentCardList';
import Pagination from '@mui/material/Pagination';
import { Student } from '@/lib/type/Student';
import StudentDetail from './detail/StudentDetail';
import Responsive from '@/components/common/layout/Responsive';
import DefaultGrid from '@/components/common/DefaultGrid';
import DefaultToolbar from '@/components/common/DefaultGrid/DefaultToolbar';
import PaymentLog from './detail/Payment';
import { useState } from 'react';
import ActionConfirmationModal from '@/components/common/backdrop/ActionConfirmationModal';
import { deleteStudent } from '@/lib/swr/students';
import { useRecoilState } from 'recoil';
import { alertModalAtom } from '@/lib/store/alert/alert-state';
import { deleteClass } from '@/lib/swr/classes';

const STATUS_LIST = [
  { label: '재원', value: true },
  { label: '퇴원', value: false },
] as const;

interface Props {
  students: Student[];
  total: number;
  pagination: { page: number; perPage: number };
  statusFilter: boolean | null;
  keywordText: string;

  columns: GridColDef[];
  drawerOpen: boolean;
  paymentDrawerOpen: boolean;
  selectedStudent: Student | null;

  onTextChange: (v: string) => void;
  onSearch: () => void;
  onStatusChange: (v: boolean | null) => void;
  onRowDoubleClick: (params: GridRowParams<Student>) => void;
  onPaginationChange: (model: GridPaginationModel) => void;
  onCloseDrawer: () => void;
  onOpenDrawer: () => void;
  onRegisterDrawer: () => void;
  onSelectMobile: (student: Student) => void;
  onSelectMobilePayment: (student: Student) => void;
  handleChangePage: (n: number) => void;
  onRefetch: () => void;

  openPaymentDrawer: () => void;
  closePaymentDrawer: () => void;
  isLoading: boolean;
}

export default function StudentsViewUI({
  students,
  total,
  pagination,
  statusFilter,
  keywordText,
  columns,
  isLoading,
  drawerOpen,
  paymentDrawerOpen,
  selectedStudent,
  onTextChange,
  onSearch,
  onStatusChange,
  onRowDoubleClick,
  onPaginationChange,
  onSelectMobilePayment,
  onRegisterDrawer,
  onCloseDrawer,
  onRefetch,
  onOpenDrawer,
  openPaymentDrawer,
  closePaymentDrawer,
  onSelectMobile,
  handleChangePage,
}: Props) {
  const GridToolbar = () => (
    <DefaultToolbar
      onClickRegister={onRegisterDrawer}
      onClickDelete={() => {
        setModalOpen(true);
      }}
      isRegisterOn
      rowId={studentId}
    />
  );

  const [alert, setAlert] = useRecoilState(alertModalAtom);

  const [studentId, setStudentId] = useState('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="py-8 px-6 flex flex-col gap-4">
        <Title title="클래스 관리" desc="클래스 관리합니다" />

        {/* 🔹 필터 */}

        {/* 🔹 리스트 */}
        <Responsive
          mobile={
            <div>
              <div className="mb-2">
                <DefaultToolbar
                  onClickRegister={onRegisterDrawer}
                  onClickDelete={() => setModalOpen(true)}
                  rowId={studentId}
                />
              </div>
              <StudentCardList
                students={students}
                selectedStudent={selectedStudent}
                onSelect={onSelectMobile}
                openPaymentDrawer={onSelectMobilePayment}
              />
              <div className="flex justify-center mt-2">
                <Pagination
                  count={Math.ceil(total / pagination.perPage)}
                  page={pagination.page}
                  onChange={(e, newPage) => handleChangePage(newPage)}
                />
              </div>
            </div>
          }
          desktop={
            <DefaultGrid
              slots={{
                toolbar: GridToolbar,
              }}
              loading={isLoading}
              rows={students}
              columns={columns}
              total={total}
              page={pagination.page}
              perPage={pagination.perPage}
              onPageChange={handleChangePage}
              onRowDoubleClick={onRowDoubleClick}
              onRowSelectionModelChange={([rowId = '']) => {
                setStudentId(rowId as string);
              }}
              pageSizeOptions={[10, 20, 30]}
            />
          }
        />

        {/* 🔻 Drawer */}
        {!paymentDrawerOpen && (
          <CommonSwipeableDrawer
            open={drawerOpen}
            onClose={onCloseDrawer}
            onOpen={onOpenDrawer}
            minHeight="60vh"
            maxHeight="80vh"
          >
            <StudentDetail
              classData={selectedStudent}
              onSuccess={async () => {
                onCloseDrawer();
                await onRefetch();
              }}
            />
          </CommonSwipeableDrawer>
        )}

        {!drawerOpen && (
          <CommonSwipeableDrawer
            open={paymentDrawerOpen}
            onClose={closePaymentDrawer}
            onOpen={openPaymentDrawer}
            minHeight="60vh"
            maxHeight="80vh"
          >
            <PaymentLog student={selectedStudent} />
          </CommonSwipeableDrawer>
        )}
        <ActionConfirmationModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          onClickCheck={async () => {
            try {
              await deleteClass(studentId); // ✅ 반드시 await

              setAlert((prev) => ({
                ...prev,
                type: 'success',
                open: true,
                message: '삭제되었습니다',
              }));

              alert.onClose?.();
              await onRefetch(); // 필요하면 await
            } catch {
              setAlert((prev) => ({
                ...prev,
                type: 'error',
                open: true,
                message: '오류가 발생했습니다',
              }));
              alert.onClose?.();
            } finally {
              setModalOpen(false);
            }
          }}
          title={'수강과목 정보삭제'}
          content={'선택된 과목정보를 삭제합니다.'}
          processing={false}
        />
      </div>
    </>
  );
}
