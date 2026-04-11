'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useEffect, useState } from 'react';
import { EventClickArg } from '@fullcalendar/core';
import { Session } from '@/lib/type/Session';

// 스타일을 적용하기 위한 별도의 CSS 모듈이나 글로벌 스타일이 필요하지만,
// 여기서는 tailwind와 styled-jsx 컨셉으로 설명합니다.

interface CalendarDataType {
  id: string;
  title: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  color: string;
}

interface Props {
  events: CalendarDataType[];
  sessions: Session[];
}

export default function SessionCalendar({ events }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-full flex px-4 md:px-8 overflow-hidden bg-slate-50/50 py-6">
      <div className="w-full bg-white border border-slate-100 rounded-[2.5rem] p-6 mb-10 shadow-sm overflow-hidden calendar-container">
        <FullCalendar
          key={isMobile ? 'mobile' : 'desktop'}
          height="100%"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={
            isMobile
              ? { right: '' }
              : { right: 'dayGridMonth,timeGridWeek,listWeek' }
          }
          initialView={isMobile ? 'listWeek' : 'dayGridMonth'}
          buttonText={{
            today: '오늘',
            month: '월간',
            week: '주간',
            list: '일정표',
          }}
          dayMaxEvents={2}
          selectable
          locale="ko"
          fixedWeekCount={false}
          showNonCurrentDates={false}
          allDaySlot={false}
          events={events}
          eventClick={(info) => console.log(info.event.id)}
        />

        {/* 🎨 FullCalendar 전용 커스텀 스타일 */}
        <style jsx global>{`
          /* 1. 헤더 툴바 디자인 */
          .fc .fc-toolbar {
            margin-bottom: 2rem !important;
            padding: 0 4px;
          }
          .fc .fc-toolbar-title {
            font-size: 1.25rem !important;
            font-weight: 900 !important;
            color: #1e293b;
            letter-spacing: -0.02em;
          }

          /* 2. 버튼 디자인 (Flat & Round) */
          .fc .fc-button {
            background-color: #f1f5f9 !important;
            border: none !important;
            color: #64748b !important;
            font-size: 13px !important;
            font-weight: 800 !important;
            border-radius: 12px !important;
            padding: 8px 16px !important;
            text-transform: capitalize !important;
            transition: all 0.2s;
          }
          .fc .fc-button-primary:not(:disabled).fc-button-active,
          .fc .fc-button-primary:not(:disabled):hover {
            background-color: #1e293b !important;
            color: white !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .fc .fc-button-group > .fc-button:not(:last-child) {
            margin-right: 4px;
            border-radius: 12px !important;
          }

          /* 3. 달력 그리드(Grid) 디자인 */
          .fc theme-standard td,
          .fc theme-standard th {
            border: 1px solid #f1f5f9 !important;
          }
          .fc .fc-scrollgrid {
            border: none !important;
            border-radius: 20px;
          }
          .fc .fc-col-header-cell {
            padding: 12px 0 !important;
            background-color: #f8fafc;
            font-size: 11px;
            font-weight: 900;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            border: none !important;
          }

          /* 4. 날짜 숫자 및 오늘 표시 */
          .fc .fc-daygrid-day-top {
            justify-content: center;
            padding-top: 10px;
          }
          .fc .fc-daygrid-day-number {
            font-weight: 700;
            color: #475569;
            font-size: 13px;
          }
          .fc .fc-day-today {
            background-color: #f8faff !important;
          }
          .fc .fc-day-today .fc-daygrid-day-number {
            color: #4f46e5;
            background: #eef2ff;
            border-radius: 8px;
            padding: 2px 8px;
          }

          /* 5. 이벤트(일정) 칩 디자인 */
          .fc-event {
            border: none !important;
            padding: 4px 8px !important;
            border-radius: 8px !important;
            font-size: 14px !important;
            font-weight: 700 !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
            margin-top: 2px !important;
            cursor: pointer !important;
            transition: transform 0.1s;
          }
          .fc-event:hover {
            transform: scale(1.02);
            filter: brightness(0.95);
          }

          /* 6. 리스트 뷰(Mobile) 디자인 */
          .fc .fc-list {
            border: none !important;
            border-radius: 20px;
          }
          .fc .fc-list-event:hover td {
            background-color: #f8fafc !important;
          }
          .fc .fc-list-day-cushion {
            background-color: #f1f5f9 !important;
            font-weight: 900 !important;
          }
        `}</style>
      </div>
    </div>
  );
}
