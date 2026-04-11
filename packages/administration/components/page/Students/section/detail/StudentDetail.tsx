'use client';

import { getClassByIds } from '@/lib/swr/classes/getClassByIds';
import { searchClasses } from '@/lib/swr/classes/search';
import { useEffect, useState } from 'react';
import Section, { SelectButton, SliderRow } from './common/Section';
import { getClassAndSession } from '@/lib/swr/students/getClassAndSession';
import SessionScheduleEditor, { SessionType } from './Session';
import { useRecoilState } from 'recoil';
import { alertModalAtom } from '@/lib/store/alert/alert-state';
import { createStudent, updateStudent } from '@/lib/swr/students';

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

  const showError = (message: string) => {
    setAlert((prev) => ({
      ...prev,
      type: 'error',
      open: true,
      message,
    }));
    alert.onClose?.();
  };

  const checkData = (payload: any) => {
    // 🔹 기본 필수값
    if (!payload?.name?.trim()) {
      showError('이름을 입력해주세요');
      return false;
    }

    if (!payload?.enrollmentDate) {
      showError('등록일을 입력해주세요');
      return false;
    }

    if (!payload?.classId || payload.classId.length === 0) {
      showError('클래스를 선택해주세요');
      return false;
    }

    // 🔹 패키지 결제일 경우
    if (payload.paymentType === 'package') {
      if (!payload.lessonBasedPayment?.total) {
        showError('총 수업 횟수를 입력해주세요');
        return false;
      }

      if (
        payload.lessonBasedPayment?.remaining === undefined ||
        payload.lessonBasedPayment?.remaining === null
      ) {
        showError('남은 수업 횟수를 입력해주세요');
        return false;
      }
    }

    // 🔹 세션 데이터가 있을 경우
    if (payload.regularDays && payload.regularDays.length === 0) {
      showError('수업 요일을 선택해주세요');
      return false;
    }

    if (payload.lessonTimes && Object.keys(payload.lessonTimes).length === 0) {
      showError('수업 시간을 입력해주세요');
      return false;
    }

    return true;
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

      if (!checkData(payload)) return;
      //sessionId 필요
      console.log(student);

      if (student?.id) await updateStudent(student?.id, payload);
      else await createStudent(payload);

      setAlert((prev) => ({
        ...prev,
        type: 'success',
        open: true,
        message: '저장되었습니다',
      }));
      alert.onClose?.();

      await onSuccess?.();
    } catch (error) {
      setAlert((prev) => ({
        ...prev,
        type: 'error',
        open: true,
        message: '오류가 발생했습니다',
      }));
      alert.onClose?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6 flex flex-col gap-4">
          <div className="w-[50px] h-[5px] bg-gray-300 rounded-xl mx-auto" />

          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 text-left px-1">
              {isEditMode ? '수강생 정보 수정' : '새로운 수강생 등록'}
            </h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider px-1">
              Student Information Management
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-wider">
              이름
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full h-12 pl-4 text-sm font-bold rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-900/10 outline-none transition-all placeholder:text-slate-300 text-slate-700 shadow-sm shadow-slate-100/50"
            />
          </div>

          <Section title="결제 타입">
            <div className="flex gap-3 mt-1">
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
            <div className="relative group">
              <input
                type="date"
                value={form.enrollmentDate}
                onChange={(e) => updateField('enrollmentDate', e.target.value)}
                className="w-full h-11 rounded-2xl bg-slate-50 border-none px-4 text-sm font-bold text-slate-600 outline-none cursor-pointer focus:bg-slate-100 transition-colors"
              />
            </div>
          </Section>

          {form.paymentType === 'package' && (
            <div className="space-y-6 pt-4 border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-4 px-1">
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

          <div className="pt-4 border-t border-slate-50 space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-wider">
              클래스 선택
            </label>
            <div className="space-y-3">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="수강할 클래스 검색"
                className="w-full h-11 px-4 rounded-2xl bg-slate-50 border-none text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300 focus:ring-2 focus:ring-slate-100"
              />

              {searchResults.length > 0 && (
                <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/40">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSearchKeyword('');
                        addClass(item);
                      }}
                      className="px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-none"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-1">
                {selectedClasses.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-xl text-[11px] font-black shadow-md shadow-slate-200 animate-in zoom-in-95 duration-200"
                  >
                    <span>{item.name}</span>
                    <button
                      type="button"
                      onClick={() => removeClass(item.id)}
                      className="hover:text-rose-400 transition-colors"
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
      <div className="sticky bottom-0 px-6 pb-8 pt-4 bg-white/80 backdrop-blur-md">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`
        w-full h-14 rounded-[1.5rem] font-black text-sm transition-all flex items-center justify-center gap-2
        ${
          loading
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-xl shadow-slate-200'
        }
      `}
        >
          {loading ? (
            <span className="flex items-center gap-2 animate-pulse">
              저장 중...
            </span>
          ) : (
            <>
              <span className="mb-0.5">
                {isEditMode ? '변경사항 저장' : '수강생 등록하기'}
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
