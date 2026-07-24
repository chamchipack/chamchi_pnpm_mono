'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { alertModalAtom } from '@/lib/store/alert/alert-state';
import { createClass, updateClass } from '@/lib/swr/classes';
import { SliderRow } from './common/Section';

interface ClassData {
  id?: string;
  name: string;
  price: number;
}

interface Props {
  classData?: ClassData | any;
  onSuccess?: () => void; // 저장 후 콜백 (optional)
}

const defaultForm = {
  name: '',
  price: 0,
};

export default function ClassDetail({ classData, onSuccess }: Props) {
  const isEditMode = !!classData?.id;

  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useRecoilState(alertModalAtom);

  /**
   * 🔥 classData 변경 시 form 동기화
   */
  useEffect(() => {
    if (!classData) {
      setForm(defaultForm);
      return;
    }

    setForm({
      name: classData.name ?? '',
      price: classData.price ?? 0,
    });
  }, [classData]);

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

  const checkData = (payload: Omit<ClassData, 'id'>) => {
    if (!payload?.name?.trim()) {
      showError('클래스명을 입력해주세요');
      return false;
    }

    if (!payload?.price || payload.price <= 0) {
      showError('금액을 입력해주세요');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        name: form.name,
        price: form.price,
      };

      if (!checkData(payload)) return;

      if (classData?.id) await updateClass(classData.id, payload);
      else await createClass(payload);
      console.log(payload);

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
              {isEditMode ? '클래스 정보 수정' : '새로운 클래스 등록'}
            </h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider px-1">
              Class Information Management
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-wider">
              과목명
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full h-12 pl-4 text-sm font-bold rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-900/10 outline-none transition-all placeholder:text-slate-300 text-slate-700 shadow-sm shadow-slate-100/50"
            />
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-4 px-1">
              <SliderRow
                label="금액"
                value={form.price}
                max={200000}
                onChange={(v) => updateField('price', v)}
                word={'원'}
                step={10000}
              />
            </div>
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
                {isEditMode ? '변경사항 저장' : '클래스 등록하기'}
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
