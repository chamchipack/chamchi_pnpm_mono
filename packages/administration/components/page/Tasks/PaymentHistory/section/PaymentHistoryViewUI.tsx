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
// import StudentCardList from './StudentCardList';
import Pagination from '@mui/material/Pagination';
import { Attendance } from '@/lib/type/Attendance';
// import StudentDetail from './detail/StudentDetail';
import Responsive from '@/components/common/layout/Responsive';
import DefaultGrid from '@/components/common/DefaultGrid';
import DefaultToolbar from '@/components/common/DefaultGrid/DefaultToolbar';
// import PaymentLog from './detail/Payment';
import { useState } from 'react';
import ActionConfirmationModal from '@/components/common/backdrop/ActionConfirmationModal';
import { deleteStudent } from '@/lib/swr/students';
import { useRecoilState } from 'recoil';
import { alertModalAtom } from '@/lib/store/alert/alert-state';

const STATUS_LIST = [
  { label: '재원', value: true },
  { label: '퇴원', value: false },
] as const;

interface Props {
  students: Attendance[];
  total: number;
  pagination: { page: number; perPage: number };
  statusFilter: boolean | null;
  keywordText: string;

  columns: GridColDef[];
  drawerOpen: boolean;
  paymentDrawerOpen: boolean;
  selectedHistory: Attendance | null;

  onTextChange: (v: string) => void;
  onSearch: () => void;
  onStatusChange: (v: boolean | null) => void;
  onRowDoubleClick: (params: GridRowParams<Attendance>) => void;
  onPaginationChange: (model: GridPaginationModel) => void;
  onCloseDrawer: () => void;
  onOpenDrawer: () => void;
  onRegisterDrawer: () => void;
  onSelectMobile: (student: Attendance) => void;
  onSelectMobilePayment: (student: Attendance) => void;
  handleChangePage: (n: number) => void;
  onRefetch: () => void;

  openPaymentDrawer: () => void;
  closePaymentDrawer: () => void;
  isLoading: boolean;
}

export default function PaymentHistoryViewUI({
  students,
  total,
  pagination,
  statusFilter,
  keywordText,
  columns,
  isLoading,
  drawerOpen,
  paymentDrawerOpen,
  selectedHistory,
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
      isDeleteOn={false}
      isRegisterOn={false}
      rowId={studentId}
    />
  );

  const [alert, setAlert] = useRecoilState(alertModalAtom);

  const [studentId, setStudentId] = useState('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* 🔹 필터 */}
        <div className="flex flex-col gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
            className="flex items-center w-full max-w-[500px] bg-slate-50 border border-slate-200 rounded-2xl p-1.5 transition-all duration-300 focus-within:bg-white focus-within:border-slate-400"
          >
            <div className="flex items-center flex-1 px-3">
              {/* 은은한 슬레이트 포인트 아이콘 */}
              <Search size={18} className="text-slate-400" strokeWidth={2} />
              <input
                type="text"
                placeholder="수강생 이름 검색"
                value={keywordText}
                onChange={(e) => onTextChange(e.target.value)}
                className="w-full bg-transparent border-none outline-none px-3 text-sm font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium"
              />
            </div>

            {/* 채도가 없는 깔끔한 다크 포인트 버튼 */}
            <button
              type="submit"
              className="h-9 px-5 rounded-xl bg-slate-800 text-white text-[11px] font-black uppercase tracking-tight hover:bg-slate-900 active:scale-95 transition-all duration-200 shrink-0"
            >
              조회
            </button>
          </form>
        </div>

        {/* 🔹 리스트 */}
        <Responsive
          mobile={
            <div>
              <div className="mb-2">
                <DefaultToolbar
                  onClickRegister={onRegisterDrawer}
                  onClickDelete={() => setModalOpen(true)}
                  isDeleteOn={false}
                  isRegisterOn={false}
                  rowId={studentId}
                />
              </div>
              {/* <StudentCardList
                students={students}
                selectedHistory={selectedHistory}
                onSelect={onSelectMobile}
                openPaymentDrawer={onSelectMobilePayment}
              /> */}
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
            {/* <StudentDetail
              student={selectedHistory}
              onSuccess={async () => {
                onCloseDrawer();
                await onRefetch();
              }}
            /> */}
            <></>
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
            {/* <PaymentLog student={selectedHistory} /> */}
            <></>
          </CommonSwipeableDrawer>
        )}
        <ActionConfirmationModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          onClickCheck={async () => {
            try {
              // await deleteStudent(studentId);
              // setAlert((prev) => ({
              //   ...prev,
              //   type: 'success',
              //   open: true,
              //   message: '삭제되었습니다',
              // }));
              // alert.onClose?.();
              // await onRefetch();
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
          title={'수강생 정보삭제'}
          content={'선택된 수강생의 정보와 세션을 삭제합니다.'}
          processing={false}
        />
      </div>
    </>
  );
}
