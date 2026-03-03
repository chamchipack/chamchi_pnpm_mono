import { TrendingUp } from 'lucide-react';
import StatCard from '../StarCard';
import { getEntireMembers, getMonthlyPayment } from '@/lib/api/ssr/dashboard';

export default async function MonthlyPayment() {
  const data = await getMonthlyPayment();

  return (
    <StatCard
      title="이번 달 매출"
      value={`${data}원`}
      icon={<TrendingUp size={24} />}
      color="text-indigo-600"
      bg="bg-indigo-100"
    />
  );
}
