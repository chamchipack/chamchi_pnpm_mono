'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  UserPlus,
  Users,
  TrendingUp,
  ChevronRight,
  CalendarDays,
} from 'lucide-react';
import { getStudentForEnrollment } from '@/lib/swr/students';

export default function MonthlyNewStudents() {
  const [range, setRange] = useState(6); // 기본 6개월

  const [row, setRow] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudentForEnrollment(range.toString());
      setRow(data);
    };

    fetchData();
  }, [range]);

  const monthlyData = useMemo(() => {
    if (!row || row.length === 0) return [];

    const now = new Date();

    // API 데이터를 빠르게 찾기 위한 Map 생성
    const dataMap = new Map(
      row.map((item: any) => [`${item.year}-${item.month}`, item.count]),
    );

    const result: any = [];

    for (let i = 0; i < range; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month}`;

      const count = dataMap.get(key) ?? 0;

      result.push({
        year,
        month,
        monthStr: `${year}년 ${month}월`,
        count,
      });
    }

    // 🔥 이전 달 대비 증가 여부 계산
    return result.map((item: any, index: number) => {
      const prev = result[index + 1]; // 이전달 (배열은 최신 → 과거 순)
      const isGrowth = prev ? item.count >= prev.count : true;

      return {
        month: item.monthStr,
        count: item.count,
        isGrowth,
      };
    });
  }, [row, range]);

  return (
    <>
      {/* 1. 헤더 영역 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <UserPlus size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              신규 수강생 현황
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              New Registrations
            </p>
          </div>
        </div>

        {/* 기간 선택 버튼 (6, 12, 18, 24개월) */}
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          {[6, 12, 18, 24].map((m) => (
            <button
              key={m}
              onClick={() => setRange(m)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-black transition-all ${
                range === m
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {m}M
            </button>
          ))}
        </div>
      </div>

      {/* 2. 리스트 영역 (자체 스크롤 가능) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto pr-2 max-h-[400px] custom-scrollbar">
        {monthlyData.map((item: any, i: number) => (
          <div
            key={i}
            className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between group hover:border-blue-100 hover:bg-white transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:border-blue-200 transition-colors">
                <CalendarDays size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{item.month}</p>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${item.isGrowth ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  />
                  <p className="text-[10px] text-slate-400 font-medium">
                    정기 모집 포함
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5">
                <p className="text-lg font-black text-slate-900">
                  {item.count}명
                </p>
                <ChevronRight size={14} className="text-slate-300" />
              </div>
              {item.isGrowth && (
                <p className="text-[9px] font-bold text-emerald-500 flex items-center justify-end gap-0.5">
                  <TrendingUp size={10} /> 상승세
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
