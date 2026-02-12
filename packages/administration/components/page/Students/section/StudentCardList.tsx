'use client';

import { Student } from '@/lib/type/Student';

interface Props {
  students: Student[];
  onSelect: (s: Student) => void;
}

export default function StudentCardList({ students, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {students.map((s) => (
        <div
          key={s.id}
          className="rounded-lg border border-gray-200 p-4 bg-white"
          onClick={() => onSelect(s)}
        >
          <div className="font-semibold">{s.name}</div>
          <div className="text-sm text-gray-500">{s.paymentType}</div>
          <div className="text-sm text-gray-500">{s.type}</div>
          <div className="text-xs mt-2">
            상태: <span className="font-medium">{s.enrollmentDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
