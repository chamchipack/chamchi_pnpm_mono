'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Receipt, Calendar, Download } from 'lucide-react';
import { getDashboardPayment } from '@/lib/swr/payment';

export default function PaymentHistorySection() {
  const [range, setRange] = useState('3'); // 최근 3개월 기본값
  const [row, setRow] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboardPayment(range);
      setRow(data);
    };

    fetchData();
  }, [range]);

  const rows = [
    {
      date: '2024.05.24',
      item: '5월 수학 A반 수강료',
      amount: '250,000',
      method: '카드',
      status: '결제완료',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      date: '2024.05.15',
      item: '교재비 (수학의 정석)',
      amount: '35,000',
      method: '현금',
      status: '결제완료',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      date: '2024.04.24',
      item: '4월 수학 A반 수강료',
      amount: '250,000',
      method: '카드',
      status: '취소',
      color: 'text-slate-400 bg-slate-100',
    },
    {
      date: '2024.03.24',
      item: '3월 수학 A반 수강료',
      amount: '250,000',
      method: '카드',
      status: '결제완료',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      date: '2024.02.24',
      item: '2월 수학 A반 수강료',
      amount: '250,000',
      method: '카드',
      status: '결제완료',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      date: '2024.01.24',
      item: '1월 수학 A반 수강료',
      amount: '250,000',
      method: '카드',
      status: '결제완료',
      color: 'text-emerald-600 bg-emerald-50',
    },
  ];

  // ✅ 결제완료 건만 합산
  const totalAmount = useMemo(() => {
    return row.reduce((sum: any, item: any) => {
      return sum + (item.totalAmount ?? 0);
    }, 0);
  }, [row]);

  return (
    <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[500px]">
      {/* 상단 헤더 영역 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Receipt size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">결제 내역</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Payment Records
            </p>
          </div>
        </div>

        {/* 기간 선택 필터 */}
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          {[
            { label: '3개월', value: '3' },
            { label: '6개월', value: '6' },
            { label: '12개월', value: '12' },
            { label: '24개월', value: '24' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setRange(item.value)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                range === item.value
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 테이블 본문 */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-50">
              <th className="pb-4 font-black">결제일</th>
              <th className="pb-4 font-black">항목</th>
              <th className="pb-4 font-black text-right">금액</th>
              <th className="pb-4 font-black text-center">수단/상태</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {row.map((row: any, i: number) => (
              <tr
                key={i}
                className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50/50 last:border-none"
              >
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-300" />
                    <span className="font-mono text-slate-500">
                      {row.year}.{row.month}
                    </span>
                  </div>
                </td>
                <td className="py-4 font-bold text-slate-800">
                  {row.month}월 결제
                </td>
                <td className="py-4 text-right">
                  <span className="font-black text-slate-900">
                    ₩{Number(row.totalAmount ?? 0).toLocaleString('ko-KR')}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-medium">
                      {row.count}건
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${row.color}`}
                    ></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-6 mt-2 border-t border-slate-50 flex justify-between items-center shrink-0">
        <div>
          <p className="text-xs text-slate-400">
            총 <b>{range}개월</b>간의 내역입니다.
          </p>
          <p className="text-sm font-black text-slate-900 mt-1">
            총 결제 금액 ₩{totalAmount.toLocaleString()}
          </p>
        </div>

        {/* <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors">
          <Download size={14} /> 내역 다운로드
        </button> */}
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </section>
  );
}
