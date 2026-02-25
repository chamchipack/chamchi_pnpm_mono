'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  History,
  CreditCard,
  Receipt,
  Plus,
  ArrowUpRight,
  LayoutGrid,
  Search,
  Bell,
  CheckCircle2,
} from 'lucide-react';

// --- 1. 하위 콘텐츠 컴포넌트들 (Internal Components) ---

const AttendanceAction = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: '전체 학생', value: '42명' },
        { label: '현재 출석', value: '38명' },
        { label: '미결석', value: '4명' },
      ].map((s, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm"
        >
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            {s.label}
          </p>
          <p className="text-2xl font-black text-gray-900 mt-1">{s.value}</p>
        </div>
      ))}
    </div>
    <div className="h-64 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
      <UserCheck size={40} className="mb-2 opacity-20" />
      <p>출석 체크를 위한 학생 리스트를 불러오세요</p>
    </div>
  </div>
);

const AttendanceHistory = () => (
  <div className="space-y-4 animate-in fade-in duration-500">
    <div className="flex items-center justify-between px-2">
      <h3 className="font-bold text-gray-800">최근 기록</h3>
      <button className="text-xs text-blue-600 font-bold">전체보기</button>
    </div>
    {[1, 2, 3].map((_, i) => (
      <div
        key={i}
        className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">
              김철수 학생 출석 완료
            </p>
            <p className="text-xs text-gray-400">2024.05.20 14:00</p>
          </div>
        </div>
        <ArrowUpRight size={16} className="text-gray-300" />
      </div>
    ))}
  </div>
);

const PaymentAction = () => (
  <div className="h-full flex flex-col items-center justify-center py-12 animate-in zoom-in-95 duration-500">
    <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-500 mb-4">
      <CreditCard size={32} />
    </div>
    <h3 className="text-xl font-bold text-gray-900">결제 대기 중</h3>
    <p className="text-gray-400 text-sm mt-1 mb-6 text-center">
      현재 새로 처리할 결제 요청이
      <br />
      존재하지 않습니다.
    </p>
    <button className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-colors">
      결제창 열기
    </button>
  </div>
);

const PaymentHistory = () => (
  <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden animate-in slide-in-from-right-8 duration-500">
    <div className="relative z-10">
      <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
        Revenue
      </p>
      <h3 className="text-3xl font-black mb-6">₩ 12,450,000</h3>
      <div className="space-y-3">
        {[
          { t: '학원비 수납', v: '+ ₩ 250,000' },
          { t: '교재비 결제', v: '+ ₩ 35,000' },
        ].map((item, i) => (
          <div
            key={i}
            className="flex justify-between text-sm py-2 border-b border-white/10 opacity-80"
          >
            <span>{item.t}</span>
            <span className="font-mono">{item.v}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-30" />
  </div>
);

// --- 2. 메인 대시보드 페이지 (Main Dashboard) ---

export default function ModernDashboard() {
  const [activeTab, setActiveTab] = useState('attendance');

  const tabs = [
    {
      id: 'attendance',
      title: '출석처리',
      icon: UserCheck,
      desc: '오늘의 현황 관리',
      color: 'blue',
    },
    {
      id: 'attendance-history',
      title: '출석이력',
      icon: History,
      desc: '과거 데이터 조회',
      color: 'indigo',
    },
    {
      id: 'payment',
      title: '결제처리',
      icon: CreditCard,
      desc: '신규 결제 승인',
      color: 'emerald',
    },
    {
      id: 'payment-history',
      title: '결제이력',
      icon: Receipt,
      desc: '매출 내역 확인',
      color: 'amber',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-gray-900 font-sans selection:bg-blue-100">
      {/* Top Bar */}
      <nav className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <LayoutGrid size={22} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase ml-2">
            Edu<span className="text-blue-600">Flow</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-gray-100 rounded-2xl px-4 py-2 border border-transparent focus-within:border-blue-200 transition-all">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="학생 검색..."
              className="bg-transparent border-none outline-none text-sm ml-2 w-48"
            />
          </div>
          <button className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <div className="w-10 h-10 bg-gray-200 rounded-2xl border-2 border-white shadow-sm overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
            />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 p-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-80 flex flex-col gap-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 mb-2">
            Main Menu
          </p>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-4 p-4 rounded-[2rem] transition-all duration-500 text-left
                  ${
                    isActive
                      ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] scale-[1.05] z-10'
                      : 'hover:bg-gray-100/50 text-gray-500 hover:scale-[1.02]'
                  }`}
              >
                <div
                  className={`p-3 rounded-2xl transition-all duration-500 shadow-sm
                  ${isActive ? 'bg-blue-600 text-white rotate-[10deg]' : 'bg-white text-gray-400 group-hover:text-gray-600'}`}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <span
                    className={`block font-bold text-sm ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
                  >
                    {tab.title}
                  </span>
                  <span className="text-[10px] opacity-60 font-medium tracking-tight">
                    {tab.desc}
                  </span>
                </div>
                {isActive && (
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-100 min-h-[550px] flex flex-col">
            <header className="flex justify-between items-center mb-10">
              <div>
                <nav className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-blue-600">
                    {activeTab.replace('-', ' ')}
                  </span>
                </nav>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter italic capitalize">
                  {tabs.find((t) => t.id === activeTab)?.title}
                </h2>
              </div>

              <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-4 rounded-3xl font-bold text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-gray-200">
                <Plus size={20} />
                <span>New Task</span>
              </button>
            </header>

            <div className="flex-1 relative">
              {activeTab === 'attendance' && <AttendanceAction />}
              {activeTab === 'attendance-history' && <AttendanceHistory />}
              {activeTab === 'payment' && <PaymentAction />}
              {activeTab === 'payment-history' && <PaymentHistory />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
