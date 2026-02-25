'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  History,
  CreditCard,
  Receipt,
  ArrowUpRight,
} from 'lucide-react';

// 쪼개놓은 컴포넌트들을 import 합니다.
import Attendance from '../../Attendance/Container';
import AttendanceHistory from '../../AttendanceHistory/Container';
import Payment from '../../Payment/Container';
import PaymentHistory from '../../PaymentHistory/Container';

const tabs = [
  {
    id: 'attendance',
    title: '출석처리',
    icon: UserCheck,
    desc: '오늘의 출석 관리',
  },
  {
    id: 'attendance-history',
    title: '출석이력',
    icon: History,
    desc: '과거 데이터 조회',
  },
  {
    id: 'payment',
    title: '결제처리',
    icon: CreditCard,
    desc: '신규 결제 및 승인',
  },
  {
    id: 'payment-history',
    title: '결제이력',
    icon: Receipt,
    desc: '매출 내역 확인',
  },
];

export default function TaskTabs() {
  const [activeTab, setActiveTab] = useState('attendance');

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return <Attendance />;
      case 'attendance-history':
        return <AttendanceHistory />;
      case 'payment':
        return <Payment />;
      case 'payment-history':
        return <PaymentHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 px-8 py-4 min-h-[600px] mx-auto">
      {/* 1. 상단 가로형 플로팅 메뉴 (모바일 2x2, 데스크탑 1x4) */}
      <nav className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center md:items-start gap-3 md:gap-4 p-3 md:p-4 rounded-2xl transition-all duration-300 text-left
                ${
                  isActive
                    ? 'bg-main text-white shadow-xl shadow-main-100 scale-[1.02] z-10'
                    : 'bg-white hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200 shadow-sm'
                }`}
            >
              <div
                className={`p-2 rounded-xl transition-colors shrink-0 ${isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'}`}
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-white' : 'text-gray-500'}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs md:text-sm truncate">
                    {tab.title}
                  </span>
                  {isActive && (
                    <ArrowUpRight
                      size={12}
                      className="opacity-70 hidden md:block"
                    />
                  )}
                </div>
                <p
                  className={`text-[10px] mt-0.5 leading-tight truncate ${isActive ? 'text-blue-100' : 'text-gray-400'}`}
                >
                  {tab.desc}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* 2. 메인 콘텐츠 캔버스 */}
      <main className="flex-1 bg-white rounded-[1.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden flex flex-col">
        <div className="px-8 pt-8 pb-0 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              {tabs.find((t) => t.id === activeTab)?.title}
            </h2>
            <div className="h-1 w-12 bg-main mt-2 rounded-full" />
          </div>
        </div>

        {/* 쪼개진 컴포넌트가 렌더링되는 영역 */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
