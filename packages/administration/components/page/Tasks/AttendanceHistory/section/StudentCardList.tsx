'use client';

import { Student } from '@/lib/type/Student';
import { FolderOpen, ClipboardList } from 'lucide-react';

interface Props {
  students: any[];
  selectedStudent: any;
  onSelect: (s: any) => void;
  openPaymentDrawer: (s: any) => void;
}

export default function StudentCardList({
  students,
  selectedStudent,
  onSelect,
  openPaymentDrawer,
}: Props) {
  const getPaymentLabel = (type: string) => {
    if (type === 'regular') return '정기결제';
    if (type === 'package') return '회차결제';
    return type;
  };

  const getPaymentStyle = (type: string) => {
    if (type === 'regular') return 'text-blue-600';
    if (type === 'package') return 'text-purple-600';
    return 'text-gray-600';
  };

  return (
    <div className="flex flex-col gap-4">
      {students.map((s: any, index) => {
        const isSelected = selectedStudent?.id === s.id;
        const isLast = index === students.length - 1;

        return (
          <div key={s.id} className="flex gap-3">
            {/* 🔵 타임라인 점 + 선 */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-2.5 h-2.5 rounded-full mt-2
                  ${isSelected ? 'bg-main' : 'bg-gray-300'}
                `}
              />
              {!isLast && <div className="flex-1 w-px bg-gray-200 mt-1" />}
            </div>

            {/* 📄 학생 정보 */}
            <div className="flex-1 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-gray-900">
                    {s?.studentName || ''}
                  </div>

                  <span
                    className={`
                      text-xs font-medium
                      ${s.currentStatus ? 'text-emerald-600' : 'text-gray-400'}
                    `}
                  >
                    {s.currentStatus ? '재원' : '퇴원'}
                  </span>
                </div>
              </div>

              <div className="mt-1 text-sm text-gray-500">
                {getPaymentLabel(s.paymentType)} ·{' '}
                <span className={getPaymentStyle(s.paymentType)}>
                  {s.enrollmentDate}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
