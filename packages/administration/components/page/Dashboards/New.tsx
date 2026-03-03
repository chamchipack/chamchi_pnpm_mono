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
import TodayAttendance from './CardOne/TodayAttendance';
import EntireStudents from './CardOne/EntireStudents';
import TaskCount from './CardOne/TaskCount';
import MonthlyPayment from './CardOne/MonthlyPayment';
import PaymentHistorySection from './PaymentHistorySection';
import AsideComponent from './Aside';
import MonthlyNewStudents from './Register';

export default function NewDashboard() {
  console.log('SD?FS?DFS?DFS?FD?');
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TodayAttendance />
        <EntireStudents />
        <TaskCount />
        <MonthlyPayment />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Main Action Section (출석/결제 리스트) */}
        <div className="lg:col-span-2 space-y-8">
          {/* 출석 처리 섹션 */}

          <PaymentHistorySection />

          {/* 결제 처리 섹션 */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <MonthlyNewStudents />
          </section>
        </div>

        {/* 4. Side Section (이력 및 요약) */}
        <aside className="space-y-8">
          <AsideComponent />
        </aside>
      </div>
    </div>
  );
}
