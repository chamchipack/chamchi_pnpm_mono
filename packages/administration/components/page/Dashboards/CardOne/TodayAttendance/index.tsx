import { UserCheck } from 'lucide-react';
import StatCard from '../StarCard';
import { getTodayCount } from '@/lib/api/ssr/dashboard';

export default async function TodayAttendance() {
  const data = await getTodayCount();

  return (
    <StatCard
      title="오늘의 출석"
      value={`${data}명`}
      icon={<UserCheck size={24} />}
      color="text-blue-600"
      bg="bg-blue-100"
    />
  );
}
