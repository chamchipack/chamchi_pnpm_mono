'use client';

import React, { useEffect, useState } from 'react';
import {
  CreditCard,
  Package,
  CalendarCheck,
  CalendarDays,
  LayoutGrid,
  Coins,
  Landmark,
  MoreHorizontal,
} from 'lucide-react';
import {
  createPackagePayment,
  createRegularPayment,
  getPaymentForPackage,
  getPaymentForRegular,
} from '@/lib/swr/payment';
import ActionConfirmationModal from '@/components/common/backdrop/ActionConfirmationModal';
import { useRecoilState } from 'recoil';
import { alertModalAtom } from '@/lib/store/alert/alert-state';
import { formatDateTime } from '@/config/utils/time';

type PaymentType = 'regular' | 'package';

interface Student {
  id: string;
  name: string;
  paymentType: PaymentType;
  course?: string;
  paymentDueDate?: number;
  classId?: string[];
  sessionId?: string[];
  instructorId?: string[];
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

  const loadData = async () => {
    setLoading(true);

    try {
      if (activeTab === 'regular') {
        const data = await getPaymentForRegular(selectedMonth);
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
  // 탭 변경 시 데이터 로딩
  useEffect(() => {
    loadData();
  }, [activeTab, selectedMonth]);

  const students = activeTab === 'regular' ? regularData : packageData;

  return (
    <div className="space-y-6 px-4 animate-in fade-in duration-700">
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
              onActive={() => loadData()}
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
  onActive,
}: {
  student: Student;
  activeTab: PaymentType;
  onActive: () => {};
}) {
  const [alert, setAlert] = useRecoilState(alertModalAtom);

  // --- 모달 제어 상태 ---
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'cash' | 'account' | 'other'
  >('card');
  const [modalOpen, setModalOpen] = useState(false);

  const isPending =
    activeTab === 'regular'
      ? true
      : !(student.lessonBasedPayment?.isPaid ?? false);

  const infoText =
    activeTab === 'regular'
      ? `매월 ${student.paymentDueDate ?? '-'}일`
      : `${student.lessonBasedPayment?.remaining ?? 0}회 남음`;

  // --- 출석 처리 로직 (ActionConfirmationModal용) ---
  const handleConfirmAttendance = async (method: any) => {
    if (!method)
      return setAlert((prev) => ({
        ...prev,
        type: 'error',
        open: true,
        message: '결제방식을 선택해주세요.',
      }));

    try {
      const now = new Date();

      const formatterKST = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Seoul',
      });

      // 2. 날짜 구성 요소 분해
      const parts = formatterKST.formatToParts(now);
      const p = (type: any) => parts.find((part) => part.type === type)?.value;

      // 결과물 조립
      // paymentYearMonth -> "2026-04" (01, 02... 형식 보장)
      const paymentYearMonth = `${p('year')}-${p('month')}`;
      // const paymentDate = formatFullDate(now);

      const paymentDate = formatDateTime(now);

      // 공통 페이로드 구성
      const basePayload = {
        studentId: student.id,
        studentName: student.name,
        paymentType: student.paymentType,
        method: method,
        paymentDate: paymentDate,
        paymentYearMonth: paymentYearMonth,
        confirmationDate: paymentDate,
        classId: student.classId?.[0] || '',
        sessionId: student.sessionId?.[0] || '',
        instructorId: student.instructorId?.[0] || '',
        className: '',
        sessionName: '',
        remarks: '',
      };

      // --- 결제 타입별 분기 처리 ---
      if (student.paymentType === 'regular') {
        // 1. 정기 결제 (Regular)
        // 서버에서 classId로 금액을 가져오므로 amount는 생략하거나 기본값 전송
        await createRegularPayment(basePayload);
        console.log('✅ 정기 결제 생성 완료');
      } else if (student.paymentType === 'package') {
        // 2. 회차 결제 (Package)
        await createPackagePayment(basePayload);
        console.log('✅ 회차 결제 및 충전 완료');
      }

      // 성공 알림 및 데이터 갱신
      // alert('결제가 정상적으로 처리되었습니다.'); // 필요 시 주석 해제

      // 리스트 새로고침 (SWR이나 Query를 쓰신다면 mutate() 호출)
      // await mutateList();

      setModalOpen(false);

      onActive();

      return setAlert((prev) => ({
        ...prev,
        type: 'success',
        open: true,
        message: '성공적으로 저장되었습니다.',
      }));
      alert.onClose?.();
    } catch (error: any) {
      return setAlert((prev) => ({
        ...prev,
        type: 'error',
        open: true,
        message: '오류가 발생했습니다.',
      }));
    }
  };
  return (
    <>
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
              {student.course ?? '등록된 코스 없음'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">
              Info
            </p>
            <p
              className={`text-xs font-black ${isPending ? 'text-rose-500' : 'text-emerald-500'}`}
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
            // 결제 대기 상태일 때만 모달 오픈
            onClick={() => isPending && setModalOpen(true)}
          >
            {isPending ? '결제 체크' : '완료'}
          </button>
        </div>
      </div>

      {/* --- 컴포넌트 내부에 모달 배치 --- */}

      <ActionConfirmationModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onClickCheck={() => handleConfirmAttendance(paymentMethod)} // 선택된 수단을 인자로 전달
        title={`${student.name} 결제 처리`}
        content="결제 수단을 선택하고 처리를 완료해주세요."
        processing={false}
      >
        <div className="mt-6 space-y-4">
          {/* <label className="text-[14px] font-black text-slate-400 uppercase ml-1 tracking-wider">
            결제 수단 선택
          </label> */}

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                id: 'card',
                label: '카드 결제',
                icon: <CreditCard size={18} />,
              },
              { id: 'cash', label: '현금 결제', icon: <Coins size={18} /> },
              {
                id: 'account',
                label: '계좌 이체',
                icon: <Landmark size={18} />,
              },
              {
                id: 'other',
                label: '기타/미수',
                icon: <MoreHorizontal size={18} />,
              },
            ].map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as any)}
                className={`
            flex items-center gap-3 px-4 py-4 rounded-2xl border-2 transition-all duration-200
            ${
              paymentMethod === method.id
                ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-200'
                : 'border-slate-50 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:border-slate-100'
            }
          `}
              >
                <div
                  className={`${paymentMethod === method.id ? 'text-white' : 'text-slate-400'}`}
                >
                  {method.icon}
                </div>
                <span className="text-sm font-black">{method.label}</span>
              </button>
            ))}
          </div>
        </div>
      </ActionConfirmationModal>
    </>
  );
}
