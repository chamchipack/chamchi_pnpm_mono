'use client';

import { Student } from '@/lib/type/Student';
import { useState } from 'react';

interface Props {
  student: Student;
}

export default function StudentDetail({ student }: Props) {
  if (!student?.id) return null;

  /* 🔹 local state (편집용) */
  const [type, setType] = useState<'lesson' | 'class'>(student.type);
  const [paymentType, setPaymentType] = useState<'package' | 'regular'>(
    student.paymentType,
  );
  const [enrollmentDate, setEnrollmentDate] = useState(
    student.enrollmentDate ?? '',
  );

  const [lessonTotal, setLessonTotal] = useState(
    student.lessonBasedPayment?.total ?? 0,
  );
  const [lessonRemaining, setLessonRemaining] = useState(
    student.lessonBasedPayment?.remaining ?? 0,
  );

  return (
    <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
      {/* Drag Handle */}
      <div className="w-[50px] h-[5px] bg-gray-300 rounded-xl mx-auto" />

      {/* 이름 */}
      <h3 className="text-lg font-semibold text-center">{student.name}</h3>
      <div className="flex flex-row items-center">
        <span className="text-sm font-medium text-gray-600 w-12">이름</span>
        <input
          type="text"
          placeholder="이름 검색"
          value={student.name}
          // onChange={(e) => onTextChange(e.target.value)}
          className="w-full h-10 pl-4 text-base rounded-md border border-gray-300 focus:outline-none"
        />
      </div>

      {/* 🔹 수강 형태 */}
      <Section title="수강 형태">
        <div className="flex gap-2">
          <SelectButton
            label="레슨"
            active={type === 'lesson'}
            onClick={() => setType('lesson')}
          />
          <SelectButton
            label="수업"
            active={type === 'class'}
            onClick={() => setType('class')}
          />
        </div>
      </Section>

      {/* 🔹 결제 타입 */}
      <Section title="결제 타입">
        <div className="flex gap-2">
          <SelectButton
            label="회차결제"
            active={paymentType === 'package'}
            onClick={() => setPaymentType('package')}
          />
          <SelectButton
            label="정기결제"
            active={paymentType === 'regular'}
            onClick={() => setPaymentType('regular')}
          />
        </div>
      </Section>

      {/* 🔹 등록일 */}
      <Section title="등록일">
        <input
          type="date"
          value={enrollmentDate}
          onChange={(e) => setEnrollmentDate(e.target.value)}
          className="w-full h-8 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Section>

      {/* 🔹 회차 결제 정보 (package만) */}
      {paymentType === 'package' && (
        <div className="flex flex-row justify-between mt-2 bg-gray-50 px-2 py-2 rounded-md">
          <span className="text-sm font-medium text-gray-600">레슨 횟수</span>
          <div className="flex flex-col w-80 max-w-70">
            {/* 전체 횟수 */}
            <SliderRow
              label="전체 레슨 횟수"
              value={lessonTotal}
              max={8}
              onChange={setLessonTotal}
            />

            {/* 남은 횟수 */}
            <SliderRow
              label="남은 레슨 횟수"
              value={lessonRemaining}
              max={lessonTotal || 8}
              onChange={setLessonRemaining}
            />
          </div>
        </div>
      )}

      {/* 🔹 저장 버튼 (확장용) */}
      <button
        type="button"
        className="mt-4 h-11 rounded-md bg-main text-white font-medium transition"
      >
        변경사항 저장
      </button>
    </div>
  );
}

/* ===========================
   🔹 공통 UI 컴포넌트
=========================== */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center justify-between bg-gray-50 px-2 py-2 rounded-md">
      <span className="text-sm font-medium text-gray-600">{title}</span>
      <div className="">{children}</div>
    </div>
  );
}

function SelectButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-2xl text-sm font-medium border transition ${
        active
          ? 'bg-main text-white'
          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}

function SliderRow({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value} 회</span>
      </div>

      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-main"
      />
    </div>
  );
}
