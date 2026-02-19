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
    <div className="flex flex-col gap-10 mt-2">
      {displaySessions.map((sessionItem, sessionIndex) => (
        <div key={sessionIndex} className="flex flex-col gap-6">
          {/* ===== 요일 선택 ===== */}
          <div>
            <div className="grid grid-cols-7 gap-2 mt-4">
              {DAY_LIST.map((day) => {
                const isSelected = sessionItem.regularDays.includes(day.value);

                return (
                  <label
                    key={day.value}
                    className={`flex items-center justify-center h-10 rounded-md border cursor-pointer text-sm transition
                      ${
                        isSelected
                          ? 'bg-main text-white border-main'
                          : 'bg-white border-gray-300 text-gray-600'
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

          {/* ===== 시간 설정 ===== */}
          <div className="flex flex-col gap-4">
            {sessionItem.regularDays.length === 0 && (
              <div className="text-sm text-gray-400">요일을 선택해주세요.</div>
            )}

            {sessionItem.regularDays.map((day) => {
              const lessonTime = sessionItem.lessonTimes?.[day];

              return (
                <div
                  key={day}
                  className="border border-gray-200 rounded-md p-4 flex flex-col gap-3"
                >
                  <div className="text-sm font-medium text-gray-700">
                    {DAY_LABEL_MAP[day]}
                  </div>

                  <div className="flex items-center gap-3">
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
                      className="h-9 px-3 rounded-md border border-gray-300 text-sm flex-1"
                    />

                    <span className="text-gray-400">~</span>

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
                      className="h-9 px-3 rounded-md border border-gray-300 text-sm flex-1"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
