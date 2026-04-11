'use client';

type LessonTime = {
  stime: string;
  etime: string;
};

export type SessionType = {
  id: string;
  name: string;
  regularDays: string[];
  lessonTimes: Record<string, LessonTime>;
  regularTimes: any;
};

const DAY_LIST = [
  { label: '일', value: '0' },
  { label: '월', value: '1' },
  { label: '화', value: '2' },
  { label: '수', value: '3' },
  { label: '목', value: '4' },
  { label: '금', value: '5' },
  { label: '토', value: '6' },
];

const DAY_LABEL_MAP: Record<string, string> = {
  '0': '일요일',
  '1': '월요일',
  '2': '화요일',
  '3': '수요일',
  '4': '목요일',
  '5': '금요일',
  '6': '토요일',
};

interface Props {
  session: SessionType[];
  setSession: React.Dispatch<React.SetStateAction<SessionType[]>>;
}

export default function SessionScheduleEditor({ session, setSession }: Props) {
  // 신규 등록용 기본 세션 (id 추가 안 함)
  const EMPTY_SESSION: SessionType = {
    id: '',
    name: '',
    regularDays: [],
    lessonTimes: {},
    regularTimes: null,
  };

  // 화면에 보여줄 세션 (비어있으면 1개 가짜 세션 표시)
  const displaySessions = session.length === 0 ? [EMPTY_SESSION] : session;

  const handleToggleDay = (sessionIndex: number, day: string) => {
    setSession((prev) => {
      let updated = [...prev];

      // 신규 등록일 경우 배열 생성
      if (updated.length === 0) {
        updated = [EMPTY_SESSION];
      }

      const target = { ...updated[sessionIndex] };
      const isSelected = target.regularDays.includes(day);

      if (isSelected) {
        target.regularDays = target.regularDays.filter((d) => d !== day);

        const updatedTimes = { ...target.lessonTimes };
        delete updatedTimes[day];
        target.lessonTimes = updatedTimes;
      } else {
        target.regularDays = [...target.regularDays, day];
        target.lessonTimes = {
          ...target.lessonTimes,
          [day]: { stime: '', etime: '' },
        };
      }

      updated[sessionIndex] = target;
      return updated;
    });
  };

  const handleTimeChange = (
    sessionIndex: number,
    day: string,
    type: 'stime' | 'etime',
    value: string,
  ) => {
    setSession((prev) => {
      let updated = [...prev];

      // 신규 등록일 경우 배열 생성
      if (updated.length === 0) {
        updated = [EMPTY_SESSION];
      }

      const target = { ...updated[sessionIndex] };

      target.lessonTimes = {
        ...target.lessonTimes,
        [day]: {
          ...target.lessonTimes[day],
          [type]: value,
        },
      };

      updated[sessionIndex] = target;
      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-12 mt-4">
      {displaySessions.map((sessionItem, sessionIndex) => (
        <div
          key={sessionIndex}
          className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          {/* ===== 요일 선택 섹션 ===== */}
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-wider">
              요일 선택
            </label>
            <div className="grid grid-cols-7 gap-2">
              {DAY_LIST.map((day) => {
                const isSelected = sessionItem.regularDays.includes(day.value);

                return (
                  <label
                    key={day.value}
                    className={`flex items-center justify-center h-12 rounded-2xl cursor-pointer text-sm font-black transition-all duration-200 shadow-sm
                  ${
                    isSelected
                      ? 'bg-slate-900 text-white scale-105 shadow-slate-200'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                  }
                `}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleDay(sessionIndex, day.value)}
                      className="hidden"
                    />
                    {day.label}
                  </label>
                );
              })}
            </div>
          </div>

          {/* ===== 시간 설정 섹션 ===== */}
          <div className="flex flex-col gap-4">
            {sessionItem.regularDays.length === 0 ? (
              <div className="py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100 flex items-center justify-center">
                <p className="text-sm text-slate-300 font-bold">
                  상단에서 요일을 먼저 선택해주세요.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-wider">
                  시간 상세 설정
                </label>
                {sessionItem.regularDays.map((day) => {
                  const lessonTime = sessionItem.lessonTimes?.[day];

                  return (
                    <div
                      key={day}
                      className="bg-white border border-slate-100 rounded-[1.5rem] p-5 flex items-center justify-between group hover:border-slate-300 transition-colors shadow-sm shadow-slate-100/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 font-black text-xs group-hover:bg-slate-900 group-hover:text-white transition-all">
                          {DAY_LABEL_MAP[day]}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <input
                            type="time"
                            step="900"
                            value={lessonTime?.stime || ''}
                            onChange={(e) =>
                              handleTimeChange(
                                sessionIndex,
                                day,
                                'stime',
                                e.target.value,
                              )
                            }
                            className="h-10 px-4 rounded-xl bg-slate-50 border-none text-[13px] font-black text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition-all appearance-none cursor-pointer"
                          />
                        </div>

                        <span className="text-slate-300 font-bold">/</span>

                        <div className="relative">
                          <input
                            type="time"
                            value={lessonTime?.etime || ''}
                            onChange={(e) =>
                              handleTimeChange(
                                sessionIndex,
                                day,
                                'etime',
                                e.target.value,
                              )
                            }
                            className="h-10 px-4 rounded-xl bg-slate-50 border-none text-[13px] font-black text-slate-700 outline-none focus:ring-2 focus:ring-slate-100 transition-all appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
