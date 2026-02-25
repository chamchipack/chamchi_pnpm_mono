'use client';

import React from 'react';
import {
  UserCheck,
  History,
  CreditCard,
  Receipt,
  Plus,
  Users,
  ArrowUpRight,
  TrendingUp,
  Calendar as CalendarIcon,
  Search,
  Bell,
} from 'lucide-react';

export default function NewDashboard() {
  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 md:p-8 font-sans text-slate-800">
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            대시보드
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            관리자님, 오늘 처리할 작업이 5건 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* 2. Top Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: '오늘의 출석',
            value: '128명',
            icon: <UserCheck />,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
          },
          {
            title: '신규 결제',
            value: '12건',
            icon: <CreditCard />,
            color: 'text-emerald-600',
            bg: 'bg-emerald-100',
          },
          {
            title: '미처리 작업',
            value: '5건',
            icon: <History />,
            color: 'text-amber-600',
            bg: 'bg-amber-100',
          },
          {
            title: '이번 달 매출',
            value: '₩12.4M',
            icon: <TrendingUp />,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 transition-transform hover:scale-[1.02]"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              {React.cloneElement(stat.icon as React.ReactElement, {
                size: 24,
              })}
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {stat.title}
              </p>
              <p className="text-2xl font-black text-slate-900 leading-none mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Main Action Section (출석/결제 리스트) */}
        <div className="lg:col-span-2 space-y-8">
          {/* 출석 처리 섹션 */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Users size={20} />
                </div>
                <h2 className="text-xl font-bold">최근 출석 현황</h2>
              </div>
              <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                전체보기 <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-50">
                    <th className="pb-4 font-black">학생 이름</th>
                    <th className="pb-4 font-black">수업명</th>
                    <th className="pb-4 font-black">시간</th>
                    <th className="pb-4 font-black">상태</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    {
                      name: '김철수',
                      course: '수학 A반',
                      time: '14:00',
                      status: '출석',
                      color: 'text-blue-600 bg-blue-50',
                    },
                    {
                      name: '이영희',
                      course: '영어 B반',
                      time: '14:30',
                      status: '지각',
                      color: 'text-amber-600 bg-amber-50',
                    },
                    {
                      name: '박지민',
                      course: '과학 C반',
                      time: '15:00',
                      status: '미출석',
                      color: 'text-slate-400 bg-slate-50',
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="group hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 font-bold">{row.name}</td>
                      <td className="py-4 text-slate-500">{row.course}</td>
                      <td className="py-4 text-slate-500 font-mono">
                        {row.time}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black ${row.color}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 결제 처리 섹션 */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                  <Receipt size={20} />
                </div>
                <h2 className="text-xl font-bold">결제 이력</h2>
              </div>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-2">
                <Plus size={14} /> 신규 결제
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">정규 수강료 수납</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        2024-05-24 15:42
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-black text-slate-900">₩250,000</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 4. Side Section (이력 및 요약) */}
        <aside className="space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
            <h3 className="text-lg font-bold mb-6 relative z-10">
              오늘의 일정
            </h3>
            <div className="space-y-6 relative z-10">
              {[
                { time: '14:00', task: '수학 A반 출석 체크', active: true },
                {
                  time: '16:00',
                  task: '신규 상담 예약 (이민지)',
                  active: false,
                },
                { time: '18:00', task: '일일 결제 마감', active: false },
              ].map((t, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span
                    className={`text-[10px] font-bold py-1 px-2 rounded-lg ${t.active ? 'bg-blue-600' : 'bg-slate-800 text-slate-500'}`}
                  >
                    {t.time}
                  </span>
                  <p
                    className={`text-sm ${t.active ? 'text-white font-medium' : 'text-slate-500'}`}
                  >
                    {t.task}
                  </p>
                </div>
              ))}
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-20 transition-all group-hover:opacity-40" />
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <CalendarIcon size={18} className="text-blue-600" />
              <h3 className="font-bold">주요 공지사항</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-black text-blue-600 mb-1">NOTICE</p>
                <p className="text-sm font-bold text-slate-700 leading-snug">
                  다음 주 월요일 정기 점검이 예정되어 있습니다.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
