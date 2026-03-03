import { History } from 'lucide-react';
import StatCard from '../StarCard';
import { getTaskCount } from '@/lib/api/ssr/dashboard';

export default async function TaskCount() {
  const data = await getTaskCount();

  return (
    <StatCard
      title="출석 미처리건"
      value={`${data}명`}
      icon={<History size={24} />}
      color="text-amber-600"
      bg="bg-amber-100"
    />
  );
}
