'use client';

import React, { useEffect, useState } from 'react';
import {
  CreditCard,
  Package,
  CalendarCheck,
  CalendarDays,
  LayoutGrid,
} from 'lucide-react';
import { getPaymentForPackage, getPaymentForRegular } from '@/lib/swr/payment';

type PaymentType = 'regular' | 'package';

interface Student {
  id: string;
  name: string;
  paymentType: PaymentType;
  course?: string;
  paymentDueDate?: number;
  lessonBasedPayment?: {
    remaining?: number;
    isPaid?: boolean;
  };
}

export default function ContainerComponent() {
  const [activeTab, setActiveTab] = useState<PaymentType>('regular');

  const [selectedMonth, setSelectedMonth] = useState<string>(() =>
    new Date().toISOString().substring(0, 7),
  );

  const [regularData, setRegularData] = useState<Student[]>([]);
  const [packageData, setPackageData] = useState<Student[]>([]);

  const [loading, setLoading] = useState(false);

  // 탭 변경 시 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        if (activeTab === 'regular') {
          const data = await getPaymentForRegular();
          setRegularData(data ?? []);
        }

        if (activeTab === 'package') {
          const data = await getPaymentForPackage();
          setPackageData(data ?? []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  const students = activeTab === 'regular' ? regularData : packageData;

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 animate-in fade-in duration-700">
      {/* 헤더 */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 shrink-0">
            <CalendarCheck size={24} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black text-slate-900 leading-tight">
              결제 체크 데스크
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Management System
            </p>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab('regular')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
              activeTab === 'regular'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-slate-400 hover:text-slate-500'
            }`}
          >
            <CreditCard size={16} />
            정규결제
          </button>

          <button
            onClick={() => setActiveTab('package')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
              activeTab === 'package'
                ? 'bg-white text-amber-600 shadow-md'
                : 'text-slate-400 hover:text-slate-500'
            }`}
          >
            <Package size={16} />
            회차결제
          </button>
        </div>
      </div>

      {/* 옵션 바 */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-slate-400">
          <LayoutGrid size={14} />
          <span className="text-[11px] font-bold uppercase tracking-widest">
            {activeTab === 'regular' ? 'Monthly List' : 'Package List'} (
            {students.length})
          </span>
        </div>

        {activeTab === 'regular' && (
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
            <CalendarDays size={14} className="text-indigo-500" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent border-none text-xs font-black text-slate-700 outline-none cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* 리스트 */}
      <div
        key={activeTab}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        {!loading && students.length > 0 ? (
          students.map((student) => (
            <PaymentCard
              key={student.id}
              student={student}
              activeTab={activeTab}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">
              해당하는 수강생이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentCard({
  student,
  activeTab,
}: {
  student: Student;
  activeTab: PaymentType;
}) {
  const isPending =
    activeTab === 'regular'
      ? true
      : !(student.lessonBasedPayment?.isPaid ?? false);

  const infoText =
    activeTab === 'regular'
      ? `매월 ${student.paymentDueDate ?? '-'}일`
      : `${student.lessonBasedPayment?.remaining ?? 0}회 남음`;

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 p-5 flex items-center justify-between hover:shadow-xl hover:shadow-slate-200/40 hover:scale-[1.01] transition-all duration-300">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
            activeTab === 'regular'
              ? 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white'
              : 'bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white'
          }`}
        >
          {activeTab === 'regular' ? (
            <CreditCard size={20} />
          ) : (
            <Package size={20} />
          )}
        </div>

        <div>
          <h3 className="font-bold text-slate-800 tracking-tight text-base">
            {student.name}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">
            {student.course ?? ''}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right hidden sm:block">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
            Info
          </p>

          <p
            className={`text-xs font-black ${
              isPending ? 'text-rose-500' : 'text-emerald-500'
            }`}
          >
            {infoText}
          </p>
        </div>

        <button
          className={`
          px-5 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95
          ${
            isPending
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800'
              : 'bg-emerald-50 text-emerald-600 cursor-default'
          }
        `}
        >
          {isPending ? '결제 체크' : '완료'}
        </button>
      </div>
    </div>
  );
}
