'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useEffect, useState } from 'react';
import { EventClickArg } from '@fullcalendar/core';
import { Session } from '@/lib/type/Session';

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedId(clickInfo.event.id);
  };

  return (
    <div className="h-full flex px-8 overflow-hidden">
      <div className="w-full border-2 border-gray-100 rounded-3xl p-4 mb-10 overflow-hidden">
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
              ? { right: '' } // ✅ 버튼 제거
              : {
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }
          }
          initialView={isMobile ? 'listWeek' : 'dayGridMonth'}
          buttonText={{
            today: '오늘로 이동',
            month: '월',
            week: '주',
            day: '일',
            list: '리스트',
          }}
          dayMaxEvents={4}
          selectable
          locale="ko"
          fixedWeekCount={false}
          showNonCurrentDates={false}
          allDaySlot={false}
          events={events}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
}
