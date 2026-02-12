'use client';

import { useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

/**
 * 예시 로그 데이터
 */
type Log = {
  id: number;
  time: string;
  title: string;
  user: string;
  status: string;
};

const MOCK_LOGS: Log[] = [
  { id: 1, time: '10:32', title: '작업 완료', user: '김소연', status: 'DONE' },
  {
    id: 2,
    time: '10:15',
    title: '작업 시작',
    user: '관리자',
    status: 'IN_PROGRESS',
  },
  {
    id: 3,
    time: '09:58',
    title: '작업 생성',
    user: '김소연',
    status: 'CREATED',
  },
  {
    id: 4,
    time: '09:30',
    title: '담당자 변경',
    user: '관리자',
    status: 'UPDATED',
  },
];

export default function LogsPage() {
  const logs = useMemo(() => MOCK_LOGS, []);

  const columns: GridColDef[] = [
    { field: 'time', headerName: '시간', width: 90 },
    { field: 'title', headerName: '이벤트', flex: 1 },
    { field: 'user', headerName: '사용자', width: 120 },
    { field: 'status', headerName: '상태', width: 140 },
  ];

  return (
    <div className="p-4">
      <h1 className="font-semibold text-lg mb-4">작업 로그</h1>

      {/* 🖥 데스크탑: DataGrid */}
      <div className="hidden min-[481px]:block">
        <DataGrid
          autoHeight
          rows={logs}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </div>

      {/* 📱 모바일: 로그 리스트 (Timeline 스타일) */}
      <div className="block min-[481px]:hidden">
        <div className="flex flex-col gap-4">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-3">
              {/* 타임라인 점 */}
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-main mt-2" />
                <div className="flex-1 w-px bg-gray-200" />
              </div>

              {/* 로그 내용 */}
              <div className="pb-4">
                <div className="text-xs text-gray-400">{log.time}</div>
                <div className="font-medium">{log.title}</div>
                <div className="text-sm text-gray-500">
                  {log.user} · {log.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
