'use client';

import { useMemo, useState } from 'react';
import moment from 'moment';
import { Session } from '@/lib/type/Session';
import { getColorForType } from '@/config/utils/hashColor/getHashColor';
import SessionCalendar from '../SessionCalendar';

interface Props {
  initialSessions: Session[];
}

interface CalendarDataType {
  id: string;
  title: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  color: string;
}

export default function SessionContainer({ initialSessions }: Props) {
  const [sessions] = useState<Session[]>(initialSessions);

  const calendarData: CalendarDataType[] = useMemo(() => {
    return sessions.reduce((acc: CalendarDataType[], item) => {
      const { id, name, regularDays = [], lessonTimes = {} } = item as any;

      regularDays.forEach((day: string) => {
        const times = lessonTimes[day];
        if (times?.stime && times?.etime) {
          acc.push({
            id,
            title: name,
            daysOfWeek: [day],
            startTime: `${times.stime}:00`,
            endTime: `${times.etime}:00`,
            color: getColorForType(name),
          });
        }
      });

      return acc;
    }, []);
  }, [sessions]);

  return <SessionCalendar events={calendarData} sessions={sessions} />;
}
