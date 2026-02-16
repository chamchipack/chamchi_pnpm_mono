'use client';

import { getIndividualPayments } from '@/lib/swr/payment';
import { useEffect, useState } from 'react';

type PaymentItem = {
  id: string;
  confirmationDate?: string;
  paymentYearMonth?: string;
  paymentDate?: string;
  amount: number;
  studentName: string;
  paymentType: 'package' | 'regular';
};

export default function PaymentLog({ student }: any) {
  const [payments, setPayments] = useState<Record<string, PaymentItem[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!student?.id) return;

    const fetchData = async () => {
      setLoading(true);
      const data = await getIndividualPayments(student.id);
      setPayments(data || {});
      setLoading(false);
    };

    fetchData();
  }, [student?.id]);

  return (
    <div className="w-full mx-auto bg-gray-50 min-h-screen p-4">
      {/* 상단 사용자 정보 */}
      <div className="bg-white rounded-2xl shadow-sm py-3 px-5 mb-6 flex flex-row justify-between">
        <div className="text-lg font-semibold text-gray-900">
          {student?.name || '수강생'}
        </div>
        <span className="text-sm text-gray-500 mt-1">결제 내역</span>
      </div>

      {/* 🔥 로딩 상태 */}
      {loading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 ml-auto"></div>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 데이터 렌더링 */}
      {!loading &&
        Object.keys(payments)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => (
            <div key={year} className="mb-8">
              <div className="sticky top-0 bg-gray-50 py-2 text-sm font-semibold text-gray-700">
                {year}년
              </div>

              <div className="flex flex-col gap-3">
                {payments[year].map((item) => {
                  const isConfirmed = !!item.confirmationDate;

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {item.paymentYearMonth} 결제
                        </span>

                        <span className="text-xs text-gray-500 mt-1">
                          {item.paymentDate} ·{' '}
                          {item.paymentType === 'package'
                            ? '회차결제'
                            : '정기결제'}
                        </span>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-sm font-semibold ${
                            !isConfirmed ? 'text-gray-400' : 'text-gray-900'
                          }`}
                        >
                          ₩{item.amount.toLocaleString()}
                        </div>

                        <div
                          className={`text-xs mt-1 ${
                            isConfirmed ? 'text-emerald-500' : 'text-amber-500'
                          }`}
                        >
                          {isConfirmed ? '결제확정' : '결제대기'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

      {/* 🔥 데이터 없을 때 */}
      {!loading && Object.keys(payments).length === 0 && (
        <div className="text-center text-sm text-gray-400 py-10">
          결제 내역이 없습니다.
        </div>
      )}
    </div>
  );
}
