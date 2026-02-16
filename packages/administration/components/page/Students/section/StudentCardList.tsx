'use client';

import { Student } from '@/lib/type/Student';
import { FolderOpen, ClipboardList } from 'lucide-react';

interface Props {
  students: Student[];
  selectedStudent: any;
  onSelect: (s: Student) => void;
  openPaymentDrawer: (s: Student) => void;
}

export default function StudentCardList({
  students,
  selectedStudent,
  onSelect,
  openPaymentDrawer,
}: Props) {
  const baseBtn =
    'flex items-center gap-2 px-2 py-1.5 rounded-md border text-xs font-medium transition';

  const getPaymentLabel = (type: string) => {
    if (type === 'regular') return '정기결제';
    if (type === 'package') return '회차결제';
    return type;
  };

  const getPaymentStyle = (type: string) => {
    if (type === 'regular') return 'bg-blue-50 text-blue-600 border-blue-100';
    if (type === 'package')
      return 'bg-purple-50 text-purple-600 border-purple-100';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div className="flex flex-col gap-3">
      {students.map((s) => {
        const isSelected = selectedStudent?.id === s.id;

        return (
          <div
            key={s.id}
            className={`
              rounded-xl border p-5 bg-white transition shadow-sm
              ${isSelected ? 'border-main ring-2 ring-main/20' : 'border-gray-200'}
            `}
          >
            {/* 상단 */}
            <div className="flex justify-between items-start">
              <div className="flex flex-row gap-2">
                <div className="text-base font-semibold text-gray-900">
                  {s.name}
                </div>

                {/* 재원 / 퇴원 배지 */}
                <span
                  className={`
                    inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      s.currentStatus
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-gray-100 text-gray-500'
                    }
                  `}
                >
                  {s.currentStatus ? '재원' : '퇴원'}
                </span>
              </div>

              <button
                onClick={() => onSelect(s)}
                className={`${baseBtn} border-gray-300 text-gray-700 hover:bg-gray-100`}
              >
                <FolderOpen size={16} />
                열기
              </button>
            </div>

            {/* 결제 타입 */}
            <div className="mt-2">
              <span
                className={`
                  inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border
                  ${getPaymentStyle(s.paymentType)}
                `}
              >
                {getPaymentLabel(s.paymentType)}
              </span>
            </div>

            {/* 하단 (등록일 ↔ 내역 버튼) */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-gray-400">
                등록일: {s.enrollmentDate}
              </div>

              <button
                onClick={() => openPaymentDrawer(s)}
                className={`${baseBtn} border-main text-main hover:bg-main/5`}
              >
                <ClipboardList size={16} />
                내역
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
