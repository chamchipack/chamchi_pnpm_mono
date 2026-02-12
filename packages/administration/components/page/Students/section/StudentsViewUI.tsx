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
  selectedStudent: Student | null;

  onTextChange: (v: string) => void;
  onSearch: () => void;
  onStatusChange: (v: boolean | null) => void;
  onRowDoubleClick: (params: GridRowParams<Student>) => void;
  onPaginationChange: (model: GridPaginationModel) => void;
  onCloseDrawer: () => void;
  onOpenDrawer: () => void;
  onSelectMobile: (student: Student) => void;
  handleChangePage: (n: number) => void;
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
  selectedStudent,
  onTextChange,
  onSearch,
  onStatusChange,
  onRowDoubleClick,
  onPaginationChange,
  onCloseDrawer,
  onOpenDrawer,
  onSelectMobile,
  handleChangePage,
}: Props) {
  return (
    <div className="px-4 py-4 flex flex-col gap-4">
      <Title title="수강생 관리" desc="수강생 관리합니다" />

      {/* 🔹 필터 */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 flex-wrap">
          {STATUS_LIST.map(({ label, value }) => {
            const isActive = statusFilter === value;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onStatusChange(isActive ? null : value)}
                className={`rounded-full px-3 py-1 text-sm font-medium border transition ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault(); // 새로고침 방지
            onSearch();
          }}
          className="flex items-center gap-2 max-w-[550px]"
        >
          <input
            type="text"
            placeholder="이름 검색"
            value={keywordText}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full h-10 pl-4 text-base rounded-md border border-gray-300 focus:outline-none"
          />

          <button
            type="submit"
            className="flex items-center justify-center rounded-md border border-gray-300 px-3 h-10 text-gray-600 hover:bg-gray-100"
          >
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* 🔹 리스트 */}
      <Responsive
        mobile={
          <div>
            <div className="mb-2">
              <DefaultToolbar />
            </div>
            <StudentCardList students={students} onSelect={onSelectMobile} />
            <div className="flex justify-center mt-1">
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
              toolbar: DefaultToolbar,
            }}
            loading={isLoading}
            rows={students}
            columns={columns}
            total={total}
            page={pagination.page}
            perPage={pagination.perPage}
            onPageChange={handleChangePage}
            onRowDoubleClick={onRowDoubleClick}
            pageSizeOptions={[10, 20, 30]}
          />
        }
      />

      {/* 🔻 Drawer */}
      <CommonSwipeableDrawer
        open={drawerOpen}
        onClose={onCloseDrawer}
        onOpen={onOpenDrawer}
        minHeight="80vh"
      >
        {selectedStudent && <StudentDetail student={selectedStudent} />}
      </CommonSwipeableDrawer>
    </div>
  );
}
