'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Users, ChevronRight, Layers, Info, X } from 'lucide-react';
import { getCohortRetention } from '@/lib/swr/students';

interface RetentionPoint {
  monthOffset: number;
  yearMonth: string;
  retainedCount: number | null;
  retentionRate: number | null;
}

interface Cohort {
  cohortMonth: string;
  totalCount: number;
  retention: RetentionPoint[];
}

export default function CohortRetention() {
  const [range, setRange] = useState(6); // 기본 6개월
  const [showInfo, setShowInfo] = useState(false);

  const infoRef = useRef<HTMLDivElement>(null);

  const [cohorts, setCohorts] = useState<Cohort[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCohortRetention(range);
      setCohorts(data?.cohorts ?? []);
    };

    fetchData();
  }, [range]);

  // 바깥 클릭 시 설명 박스 닫기
  useEffect(() => {
    if (!showInfo) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
        setShowInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showInfo]);

  // 최신 코호트가 위로 오도록 정렬
  const sortedCohorts = useMemo(() => {
    return [...cohorts].sort((a, b) =>
      b.cohortMonth.localeCompare(a.cohortMonth),
    );
  }, [cohorts]);

  const formatCohortLabel = (cohortMonth: string) => {
    const [year, month] = cohortMonth.split('-');
    return `${year}년 ${Number(month)}월`;
  };

  const getBarColor = (rate: number | null) => {
    if (rate === null) return 'bg-slate-100';
    if (rate >= 80) return 'bg-emerald-500';
    if (rate >= 60) return 'bg-blue-500';
    if (rate >= 40) return 'bg-amber-400';
    return 'bg-red-400';
  };

  return (
    <>
      {/* 1. 헤더 영역 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Layers size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 relative" ref={infoRef}>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                코호트 유지율
              </h2>
              <button
                type="button"
                onClick={() => setShowInfo((prev) => !prev)}
                className="text-slate-300 hover:text-indigo-500 transition-colors"
              >
                <Info size={16} />
              </button>

              {/* 설명 박스 */}
              {showInfo && (
                <div className="absolute top-full left-0 mt-2 w-72 p-4 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 z-10 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-black text-indigo-600 uppercase tracking-wider">
                      코호트 분석이란?
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowInfo(false)}
                      className="text-slate-300 hover:text-slate-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    같은 달에 등록한 학생들을 하나의 그룹(코호트)으로 묶어,
                    시간이 지나면서 몇 명이 계속 다니고 있는지 추적하는
                    분석이에요. 예를 들어 6월에 등록한 학생 30명 중 3개월 뒤에도
                    남아있는 인원 비율을 확인할 수 있어요. 이를 통해 몇 개월차에
                    이탈이 많이 발생하는지 파악할 수 있습니다.
                  </p>
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Cohort Retention
            </p>
          </div>
        </div>

        {/* 기간 선택 버튼 (3, 6, 12개월) */}
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          {[3, 6, 12].map((m) => (
            <button
              key={m}
              onClick={() => setRange(m)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-black transition-all ${
                range === m
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {m}M
            </button>
          ))}
        </div>
      </div>

      {/* 2. 리스트 영역 */}
      <div className="flex flex-col gap-3 overflow-y-auto pr-2 max-h-[440px] custom-scrollbar">
        {sortedCohorts.map((cohort) => {
          const latestPoint = [...cohort.retention]
            .reverse()
            .find((p) => p.retentionRate !== null);

          return (
            <div
              key={cohort.cohortMonth}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-indigo-100 hover:bg-white transition-all duration-300 group"
            >
              {/* 상단: 코호트 정보 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:border-indigo-200 transition-colors">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {formatCohortLabel(cohort.cohortMonth)}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      등록 {cohort.totalCount}명
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <p className="text-lg font-black text-slate-900">
                      {latestPoint?.retentionRate ?? '—'}
                      {latestPoint?.retentionRate !== undefined &&
                      latestPoint?.retentionRate !== null
                        ? '%'
                        : ''}
                    </p>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                  <p className="text-[9px] font-bold text-slate-400">
                    최근 유지율
                  </p>
                </div>
              </div>

              {/* 하단: 개월차별 미니 바 */}
              <div className="flex items-end gap-1.5 h-10 pl-1">
                {cohort.retention.map((point) => (
                  <div
                    key={point.monthOffset}
                    className="flex-1 flex flex-col items-center gap-1 group/bar relative"
                  >
                    <div className="w-full h-6 flex items-end">
                      <div
                        className={`w-full rounded-[3px] transition-all ${getBarColor(point.retentionRate)}`}
                        style={{
                          height:
                            point.retentionRate === null
                              ? '4px'
                              : `${Math.max(point.retentionRate, 8)}%`,
                        }}
                      />
                    </div>
                    <span className="text-[8px] font-bold text-slate-300">
                      {point.monthOffset}M
                    </span>

                    {/* 호버 툴팁 */}
                    {point.retentionRate !== null && (
                      <div className="absolute -top-6 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap">
                        {point.retentionRate}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {sortedCohorts.length === 0 && (
          <div className="text-center py-12 text-slate-300 text-xs font-bold">
            데이터가 없습니다
          </div>
        )}
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
