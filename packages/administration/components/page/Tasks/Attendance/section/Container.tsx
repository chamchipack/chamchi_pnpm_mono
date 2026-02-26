'use client';

import { getTodaySessions } from '@/lib/swr/attendance';
import { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCcw,
  LayoutList,
  ChevronRight,
} from 'lucide-react';

interface SessionItem {
  id: string;
  name: string;
}

type AttendanceStatus = 'present' | 'late' | 'absent' | 'makeup';

// 리스트 가독성을 위해 테두리(Border)와 포인트 컬러 위주로 재구성
const statusStyles: Record<
  AttendanceStatus,
  { label: string; icon: any; active: string; inactive: string }
> = {
  present: {
    label: '출석',
    icon: CheckCircle2,
    active:
      'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100',
    inactive:
      'bg-white border-gray-200 text-gray-500 hover:border-emerald-200 hover:text-emerald-600',
  },
  late: {
    label: '지각',
    icon: Clock,
    active:
      'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-100',
    inactive:
      'bg-white border-gray-200 text-gray-500 hover:border-amber-200 hover:text-amber-600',
  },
  absent: {
    label: '결석',
    icon: AlertCircle,
    active: 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-100',
    inactive:
      'bg-white border-gray-200 text-gray-500 hover:border-rose-200 hover:text-rose-600',
  },
  makeup: {
    label: '보강',
    icon: RefreshCcw,
    active: 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-100',
    inactive:
      'bg-white border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-600',
  },
};

export default function Container() {
  const [date, setDate] = useState<string>(
    () => new Date().toISOString().split('T')[0],
  );
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus>
  >({});

  const loadData = async (selectedDate: string) => {
    try {
      const day = new Date(selectedDate).getDay().toString();
      const data = await getTodaySessions(day);
      setSessions(data ?? []);
      const initial: Record<string, AttendanceStatus> = {};
      (data ?? []).forEach((item: SessionItem) => {
        initial[item.id] = 'present';
      });
      setAttendance(initial);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData(date);
  }, [date]);

  const handleStatusChange = (id: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const summary = Object.values(attendance).reduce(
    (acc, cur) => {
      acc[cur]++;
      return acc;
    },
    { present: 0, late: 0, absent: 0, makeup: 0 },
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* 1. 원래 스타일의 상단 헤더 (큰 날짜 선택 + 요약 카드) */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/40 p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2 text-main font-bold text-sm tracking-tight">
              <Calendar size={18} />
              <span>DATE SELECTOR</span>
            </div>
            <div className="relative group">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-2xl font-black bg-gray-50 border-none rounded-2xl px-6 py-4 w-full md:w-auto focus:ring-2 focus:ring-main/20 outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-[1.5]">
            {[
              { key: 'present', label: '출석', color: 'text-emerald-600' },
              { key: 'late', label: '지각', color: 'text-amber-600' },
              { key: 'absent', label: '결석', color: 'text-rose-600' },
              { key: 'makeup', label: '보강', color: 'text-blue-600' },
            ].map((s) => (
              <div
                key={s.key}
                className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100"
              >
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  {s.label}
                </p>
                <p className={`text-xl font-black ${s.color}`}>
                  {summary[s.key as AttendanceStatus]}{' '}
                  <span className="text-xs font-medium text-gray-400">건</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. 세련된 컴팩트 리스트 영역 (2열 그리드) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-4 mb-2">
          <LayoutList size={18} className="text-gray-400" />
          <h2 className="font-bold text-gray-500 uppercase tracking-tighter text-sm">
            Class Sessions
          </h2>
        </div>

        {sessions.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">
              해당 날짜에 예정된 수업이 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 p-5 flex flex-col gap-4"
              >
                {/* 카드 상단: 정보 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-main group-hover:bg-main/5 transition-colors">
                    <ChevronRight size={16} />
                  </div>
                  <h3 className="font-bold text-gray-800 text-xl tracking-tight truncate">
                    {session.name}
                  </h3>
                </div>

                {/* 카드 하단: 상태 선택 (미니멀 Outlined 스타일) */}
                <div className="grid grid-cols-4 gap-2 mt-auto">
                  {(Object.keys(statusStyles) as AttendanceStatus[]).map(
                    (status) => {
                      const isActive = attendance[session.id] === status;
                      const style = statusStyles[status];
                      const Icon = style.icon;

                      return (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(session.id, status)}
                          className={`
                          flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 transition-all duration-200 active:scale-95
                          ${isActive ? style.active : style.inactive}
                        `}
                        >
                          <Icon
                            size={14}
                            className={isActive ? 'text-white' : 'opacity-40'}
                          />
                          <span className="text-[11px] font-bold">
                            {style.label}
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
