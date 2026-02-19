'use client';

import { getClassByIds } from '@/lib/swr/classes/getClassByIds';
import { searchClasses } from '@/lib/swr/classes/search';
import { useEffect, useState } from 'react';
import Section, { SelectButton, SliderRow } from './common/Section';
import { getClassAndSession } from '@/lib/swr/students/getClassAndSession';
import SessionScheduleEditor, { SessionType } from './Session';
import { useRecoilState } from 'recoil';
import { alertModalAtom } from '@/lib/store/alert/alert-state';
import { createStudent } from '@/lib/swr/students';

interface LessonPayment {
  total: number;
  remaining: number;
  isPaid: boolean;
  over: number;
}

interface Student {
  id?: string;
  name: string;
  type: 'lesson' | 'class';
  paymentType: 'package' | 'regular';
  enrollmentDate: string;
  lessonBasedPayment?: LessonPayment | null;
  classId?: string[];
  sessionId?: string[];
}

interface Props {
  student?: Student | any;
  onSuccess?: () => void; // 저장 후 콜백 (optional)
}

const defaultForm = {
  name: '',
  type: 'lesson' as 'lesson' | 'class',
  paymentType: 'package' as 'package' | 'regular',
  enrollmentDate: '',
  lessonTotal: 0,
  lessonRemaining: 0,
  isPaid: false,
  over: 0,
};

export default function StudentDetail({ student, onSuccess }: Props) {
  const isEditMode = !!student?.id;

  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  const [selectedClasses, setSelectedClasses] = useState<
    { id: string; name: string }[]
  >([]);

  const [selectedSession, setSelectedSession] = useState<SessionType[]>([]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<
    { id: string; name: string }[]
  >([]);

  const [alert, setAlert] = useRecoilState(alertModalAtom);

  /**
   * 🔥 student 변경 시 form 동기화
   */

  const callClassData = async (ids: string[]) => {
    if (!ids.length) return [];

    try {
      const data = await getClassByIds(ids);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const callClassAndSession = async (
    classId: string[],
    sessionId: string[],
  ) => {
    if (!classId.length && !sessionId.length) return [];

    try {
      const data = await getClassAndSession(classId, sessionId);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  useEffect(() => {
    if (!student) {
      setForm(defaultForm);
      setSelectedClasses([]);
      setSelectedSession([]);
      return;
    }

    const init = async () => {
      // const classData = await callClassData(student.classId || []);
      const { classId = [], sessionId = [] }: any = await callClassAndSession(
        student.classId || [],
        student.sessionId || [],
      );

      setSelectedClasses(classId ?? []);
      setSelectedSession(sessionId ?? []);

      setForm({
        name: student.name ?? '',
        type: student.type ?? 'lesson',
        paymentType: student.paymentType ?? 'package',
        enrollmentDate: student.enrollmentDate ?? '',
        lessonTotal: student.lessonBasedPayment?.total ?? 0,
        lessonRemaining: student.lessonBasedPayment?.remaining ?? 0,
        isPaid: student.lessonBasePayment?.isPaid ?? false,
        over: student.lessonBasePayment?.over ?? 0,
      });
    };

    init();
  }, [student]);

  const removeClass = (id: string) => {
    setSelectedClasses((prev) => prev.filter((c) => c.id !== id));
  };

  const addClass = (item: { id: string; name: string }) => {
    setSelectedClasses((prev) => {
      if (prev.some((c) => c.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!searchKeyword.trim()) {
        setSearchResults([]);
        return;
      }

      const results = await searchClasses(searchKeyword);
      setSearchResults(results);
    }, 300); // 디바운스

    return () => clearTimeout(delay);
  }, [searchKeyword]);

  const updateField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: true, message: '안녕하세요' }));
    alert.onClose?.();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const sessionData = selectedSession[0]
        ? {
            regularDays: selectedSession[0].regularDays,
            lessonTimes: selectedSession[0].lessonTimes,
            regularTimes: selectedSession[0].regularTimes,
          }
        : null;

      const payload = {
        name: form.name,
        type: form.type || 'lesson',
        paymentType: form.paymentType,
        enrollmentDate: form.enrollmentDate,
        classId: selectedClasses.map((c) => c.id), // 🔥 추가
        instructorId: [],
        regularPayment: {},
        lessonBasedPayment:
          form.paymentType === 'package'
            ? {
                total: form.lessonTotal,
                remaining: form.lessonRemaining,
                over: form.over || 0,
                isPaid: form.isPaid ? form.isPaid : false,
              }
            : {},
        ...sessionData,
      };
      //sessionId 필요
      console.log(sessionData);

      const s = createStudent(payload);

      // if (isEditMode) {
      //   await fetch(`/api/students/${student!.id}`, {
      //     method: 'PATCH',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(payload),
      //   });
      // } else {
      //   await fetch('/api/students', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(payload),
      //   });
      // }

      // onSuccess?.();
      handleClose();
    } catch (error) {
      console.error('저장 실패', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6 flex flex-col gap-4">
          <div className="w-[50px] h-[5px] bg-gray-300 rounded-xl mx-auto" />

          <h3 className="text-lg font-semibold text-center">
            {isEditMode ? '수강생 정보 수정' : '수강생 등록'}
          </h3>

          <div className="flex flex-row items-center">
            <span className="text-sm font-medium text-gray-600 w-12">이름</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full h-10 pl-4 text-base rounded-md border border-gray-300 focus:outline-none"
            />
          </div>

          {/* <Section title="수강 형태">
            <div className="flex gap-2">
              <SelectButton
                label="레슨"
                active={form.type === 'lesson'}
                onClick={() => updateField('type', 'lesson')}
              />
              <SelectButton
                label="수업"
                active={form.type === 'class'}
                onClick={() => updateField('type', 'class')}
              />
            </div>
          </Section> */}

          <Section title="결제 타입">
            <div className="flex gap-2">
              <SelectButton
                label="회차결제"
                active={form.paymentType === 'package'}
                onClick={() => updateField('paymentType', 'package')}
              />
              <SelectButton
                label="정기결제"
                active={form.paymentType === 'regular'}
                onClick={() => updateField('paymentType', 'regular')}
              />
            </div>
          </Section>

          <Section title="등록일">
            <input
              type="date"
              value={form.enrollmentDate}
              onChange={(e) => updateField('enrollmentDate', e.target.value)}
              className="w-full h-8 rounded-md border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Section>

          {form.paymentType === 'package' && (
            <div className="flex flex-row justify-between mt-2 px-2 pt-4 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-600">
                레슨 횟수
              </span>

              <div className="flex flex-col w-80 max-w-70">
                <SliderRow
                  label="전체 레슨 횟수"
                  value={form.lessonTotal}
                  max={8}
                  onChange={(v) => updateField('lessonTotal', v)}
                />

                <SliderRow
                  label="남은 레슨 횟수"
                  value={form.lessonRemaining}
                  max={form.lessonTotal || 8}
                  onChange={(v) => updateField('lessonRemaining', v)}
                />
              </div>
            </div>
          )}

          <div className="flex flex-row justify-between mt-2 px-2 py-4 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-600">
              클래스 선택
            </span>

            <div className="flex flex-col w-80 max-w-70">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="클래스 검색"
                className="w-full h-9 px-3 rounded-md border border-gray-300 text-sm"
              />

              {searchResults.length > 0 && (
                <div className="border border-t-0 border-gray-200 rounded-b-md max-h-40 overflow-y-auto">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSearchKeyword('');
                        addClass(item);
                      }}
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedClasses.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-3 py-1 bg-main/10 text-main rounded-full text-sm"
                  >
                    <span>{item.name}</span>
                    <button
                      type="button"
                      onClick={() => removeClass(item.id)}
                      className="text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 px-2 py-2 border-t border-gray-100">
            <SessionScheduleEditor
              session={selectedSession}
              setSession={setSelectedSession}
            />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 px-4 pb-4 pt-2 bg-white">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="
    w-full h-11 rounded-md font-medium transition text-white
    bg-main
    disabled:bg-gray-400
    disabled:cursor-not-allowed
  "
        >
          {loading
            ? '저장 중...'
            : isEditMode
              ? '변경사항 저장'
              : '수강생 등록'}
        </button>
      </div>
    </>
  );
}
