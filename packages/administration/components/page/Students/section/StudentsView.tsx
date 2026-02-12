// 'use client';

// import { useState } from 'react';
// import {
//   DataGrid,
//   GridColDef,
//   GridPaginationModel,
//   GridRowParams,
// } from '@mui/x-data-grid';
// import StudentCardList from './StudentCardList';
// import Title from '@/components/common/layout/Title/Title';
// import CommonSwipeableDrawer from '@/components/common/backdrop/CommonSwipeableDrawer';
// import { Student } from '@/lib/type/Student';
// import { Search } from 'lucide-react';

// interface Props {
//   students: Student[];
//   keyword: string;
//   total: number;
//   pagination: any;
//   setPagination: (v: any) => void;
//   statusFilter: boolean | null;
//   onKeywordChange: (v: string) => void;
//   onStatusChange: (v: boolean | null) => void;
// }

// const STATUS_LIST = [
//   { label: '재원', value: true },
//   { label: '퇴원', value: false },
// ] as const;

// export default function StudentsView({
//   students = [],
//   statusFilter,
//   total,
//   pagination,
//   setPagination,
//   onKeywordChange,
//   onStatusChange,
// }: Props) {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [text, setText] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

//   const columns: GridColDef[] = [
//     {
//       field: 'name',
//       headerName: '이름',
//       flex: 1,
//       headerAlign: 'center',
//       align: 'center',
//     },
//     {
//       field: 'enrollmentDate',
//       headerName: '등록일',
//       width: 110,
//       headerAlign: 'center',
//       align: 'center',
//     },
//     {
//       field: 'type',
//       headerName: '수강 타입',
//       width: 100,
//       headerAlign: 'center',
//       align: 'center',
//     },
//     { field: 'paymentType', headerName: '수강정보', flex: 1 },
//     { field: 'currentStatus', headerName: '등록상태', flex: 1 },
//     {
//       field: 'lastPaymentDate',
//       headerName: '최근결제일',
//       width: 150,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: ({ row: { regularPayment = {} } = {} }) => {
//         return regularPayment?.lastPaymentDate ?? '-';
//       },
//     },
//     {
//       field: 'regularPayment',
//       headerName: '다음 예상결제일',
//       width: 150,
//       headerAlign: 'center',
//       align: 'center',
//       renderCell: ({ row: { regularPayment = {} } = {} }) => {
//         return regularPayment?.nextDueDate ?? '-';
//       },
//     },
//     { field: 'lessonBasePayment', headerName: '회차 결제여부', flex: 1 },
//   ];

//   const handleRowClick = (params: GridRowParams<Student>) => {
//     setSelectedStudent(params.row);
//     setDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setDrawerOpen(false);
//     setSelectedStudent(null);
//   };

//   const handlePageChange = (model: GridPaginationModel) => {
//     setPagination({ page: model.page + 1, perPage: model.pageSize });
//   };

//   return (
//     <div className="px-4 py-4 flex flex-col gap-4">
//       <Title title="수강생 관리" desc="수강생 관리합니다" />

//       {/* 🔹 필터 영역 */}
//       <div className="flex flex-col gap-3">
//         {/* Status Chips */}
//         <div className="flex gap-2 flex-wrap">
//           {STATUS_LIST.map(({ label, value }) => {
//             const isActive = statusFilter === value;

//             return (
//               <button
//                 key={label}
//                 type="button"
//                 onClick={() => onStatusChange(isActive ? null : value)}
//                 className={`rounded-full px-3 py-1 text-sm font-medium border transition
//           ${
//             isActive
//               ? 'bg-blue-600 text-white border-blue-600'
//               : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//           }
//         `}
//               >
//                 {label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Search Input */}
//         <div className="flex items-center gap-2">
//           {/* Input */}
//           <input
//             type="text"
//             placeholder="이름 검색"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className={`w-full h-10 pl-4 pr-10 text-base rounded-md border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:ring-main`}
//           />

//           {/* Search Button */}
//           <button
//             type="button"
//             onClick={() => onKeywordChange(text)}
//             className="flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-100 transition h-10 "
//             aria-label="검색"
//           >
//             <Search size={18} />
//           </button>
//         </div>
//       </div>

//       {/* 🔹 리스트 영역 */}
//       <div>
//         {/* 데스크탑 / 태블릿 */}
//         <div className="hidden min-[481px]:block">
//           <DataGrid
//             autoHeight
//             paginationMode="server"
//             rows={students}
//             rowCount={total}
//             paginationModel={{
//               page: pagination.page - 1 || 0,
//               pageSize: pagination.perPage,
//             }}
//             columns={columns}
//             pageSizeOptions={[10, 20, 30]}
//             disableRowSelectionOnClick
//             onRowDoubleClick={handleRowClick}
//             onPaginationModelChange={handlePageChange}
//           />
//         </div>

//         {/* 모바일 */}
//         <div className="block min-[481px]:hidden">
//           <StudentCardList
//             students={students}
//             onSelect={(student) => {
//               setSelectedStudent(student);
//               setDrawerOpen(true);
//             }}
//           />
//         </div>
//       </div>

//       {/* 🔻 하단 상세 Drawer */}
//       <CommonSwipeableDrawer
//         open={drawerOpen}
//         onClose={handleCloseDrawer}
//         onOpen={() => setDrawerOpen(true)}
//         minHeight="80vh"
//       >
//         {selectedStudent && (
//           <div className="px-4 pt-2 pb-6 flex flex-col gap-3">
//             <div
//               style={{
//                 width: '50px',
//                 height: '5px',
//                 backgroundColor: '#ccc',
//                 borderRadius: '10px',
//                 margin: '0px auto',
//               }}
//             />
//             <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>

//             <div className="text-sm text-gray-600">
//               클래스: {selectedStudent.name}
//             </div>

//             <div className="text-sm text-gray-600">
//               상태: {selectedStudent.name}
//             </div>
//           </div>
//         )}
//       </CommonSwipeableDrawer>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import {
  GridColDef,
  GridPaginationModel,
  GridRowParams,
} from '@mui/x-data-grid';
import StudentsViewUI from './StudentsViewUI';
import { Student } from '@/lib/type/Student';

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
  } = props;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [text, setText] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '이름',
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      field: 'enrollmentDate',
      headerName: '등록일',
      width: 110,
      align: 'center',
    },
    { field: 'type', headerName: '수강 타입', width: 100, align: 'center' },
    { field: 'paymentType', headerName: '수강정보' },
    { field: 'currentStatus', headerName: '등록상태' },
    {
      field: 'lastPaymentDate',
      headerName: '최근결제일',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { regularPayment = {} } = {} }) => {
        return regularPayment?.lastPaymentDate ?? '-';
      },
    },
    {
      field: 'regularPayment',
      headerName: '다음 예상결제일',
      width: 150,
      headerAlign: 'center',
      align: 'center',
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
