'use client';

import { useEffect, useState } from 'react';

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
  sessionId: SessionType[];
}

export default function SessionScheduleEditor({ sessionId }: Props) {
  const initialSession = sessionId?.[0];

  const [session, setSession] = useState<SessionType>({
    id: initialSession?.id || '',
    name: initialSession?.name || '',
    regularDays: initialSession?.regularDays || [],
    lessonTimes: initialSession?.lessonTimes || {},
    regularTimes: null,
  });

  useEffect(() => {
    if (!sessionId || sessionId.length === 0) {
      setSession({
        id: '',
        name: '',
        regularDays: [],
        lessonTimes: {},
        regularTimes: null,
      });
      return;
    }

    const newSession = sessionId[0];

    setSession({
      id: newSession.id,
      name: newSession.name,
      regularDays: newSession.regularDays || [],
      lessonTimes: newSession.lessonTimes || {},
      regularTimes: newSession.regularTimes || null,
    });
  }, [sessionId]);

  /**
   * 요일 선택 토글
   */
  const handleToggleDay = (day: string) => {
    setSession((prev) => {
      const isSelected = prev.regularDays.includes(day);

      if (isSelected) {
        // 제거
        const updatedDays = prev.regularDays.filter((d) => d !== day);
        const updatedTimes = { ...prev.lessonTimes };
        delete updatedTimes[day];

        return {
          ...prev,
          regularDays: updatedDays,
          lessonTimes: updatedTimes,
        };
      } else {
        // 추가
        return {
          ...prev,
          regularDays: [...prev.regularDays, day],
          lessonTimes: {
            ...prev.lessonTimes,
            [day]: {
              stime: '',
              etime: '',
            },
          },
        };
      }
    });
  };

  /**
   * 시간 변경
   */
  const handleTimeChange = (
    day: string,
    type: 'stime' | 'etime',
    value: string,
  ) => {
    setSession((prev) => ({
      ...prev,
      lessonTimes: {
        ...prev.lessonTimes,
        [day]: {
          ...prev.lessonTimes[day],
          [type]: value,
        },
      },
    }));
  };

  return (
    <div className="flex flex-col gap-6 mt-2">
      {/* ===== 요일 선택 ===== */}
      <div>
        <span className="text-sm font-medium text-gray-600">
          수업 요일 선택
        </span>

        <div className="grid grid-cols-7 gap-2 mt-4">
          {DAY_LIST.map((day) => {
            const isSelected = session.regularDays.includes(day.value);

            return (
              <label
                key={day.value}
                className={`
                  flex items-center justify-center h-10 rounded-md border cursor-pointer text-sm transition
                  ${
                    isSelected
                      ? 'bg-main text-white border-main'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <input
                  type="checkbox"
                  value={day.value}
                  checked={isSelected}
                  onChange={() => handleToggleDay(day.value)}
                  className="hidden"
                />
                {day.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* ===== 선택된 요일 시간 설정 ===== */}
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-gray-600">
          요일별 수업 시간
        </span>

        {session.regularDays.length === 0 && (
          <div className="text-sm text-gray-400">요일을 선택해주세요.</div>
        )}

        {session.regularDays.map((day) => {
          const lessonTime = session.lessonTimes?.[day];

          return (
            <div
              key={day}
              className="border border-gray-200 rounded-md p-4 flex flex-col gap-3"
            >
              <div className="text-sm font-medium text-gray-700">
                {DAY_LABEL_MAP[day]}
              </div>

              <div className="flex items-center gap-3">
                {/* 시작 시간 */}
                <div className="flex flex-col flex-1">
                  <label className="text-xs text-gray-500 mb-1">
                    시작 시간
                  </label>
                  <input
                    type="time"
                    value={lessonTime?.stime || ''}
                    onChange={(e) =>
                      handleTimeChange(day, 'stime', e.target.value)
                    }
                    className="h-9 px-3 rounded-md border border-gray-300 text-sm"
                  />
                </div>

                <span className="text-gray-400 mt-5">~</span>

                {/* 종료 시간 */}
                <div className="flex flex-col flex-1">
                  <label className="text-xs text-gray-500 mb-1">
                    종료 시간
                  </label>
                  <input
                    type="time"
                    value={lessonTime?.etime || ''}
                    onChange={(e) =>
                      handleTimeChange(day, 'etime', e.target.value)
                    }
                    className="h-9 px-3 rounded-md border border-gray-300 text-sm"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 디버그 확인용 (삭제 가능) */}
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
    </div>
  );
}
