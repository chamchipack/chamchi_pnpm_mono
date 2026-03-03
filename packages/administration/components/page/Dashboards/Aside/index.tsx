import { getTodaySessions } from '@/lib/api/ssr/dashboard';
import { CalendarIcon } from 'lucide-react';

export default async function AsideComponent() {
  const data = await getTodaySessions();
  const today = new Date().getDay().toString();

  // 🔥 오늘 요일 수업만 필터 + 시간 추출
  const todaySessions = data
    .filter(
      (session: any) =>
        session.regularDays?.includes(today) &&
        session.lessonTimes?.[today]?.stime,
    )
    .map((session: any) => ({
      time: session.lessonTimes[today].stime,
      task: `${session.name} 수업`,
    }))
    .sort((a: any, b: any) => a.time.localeCompare(b.time)); // 시간순 정렬

  return (
    <>
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
        <h3 className="text-lg font-bold mb-6 relative z-10">오늘의 일정</h3>

        <div className="relative z-10 max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-6">
          {todaySessions.length === 0 ? (
            <p className="text-slate-400 text-sm">
              오늘 예정된 수업이 없습니다.
            </p>
          ) : (
            todaySessions.map((t: any, i: number) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-[10px] font-bold py-1 px-2 rounded-lg bg-blue-600">
                  {t.time}
                </span>
                <p className="text-sm text-white font-medium">{t.task}</p>
              </div>
            ))
          )}
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-20 transition-all group-hover:opacity-40" />
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <CalendarIcon size={18} className="text-blue-600" />
          <h3 className="font-bold">주요 공지사항</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-black text-blue-600 mb-1">NOTICE</p>
            <p className="text-sm font-bold text-slate-700 leading-snug">
              다음 주 월요일 정기 점검이 예정되어 있습니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
