import { CreditCard } from 'lucide-react';
import StatCard from '../StarCard';
import { getEntireMembers } from '@/lib/api/ssr/dashboard';

export default async function EntireStudents() {
  const data = await getEntireMembers();

  return (
    <StatCard
      title="현재 수강생"
      value={`${data}명`}
      icon={<CreditCard size={24} />}
      color="text-emerald-600"
      bg="bg-emerald-100"
    />
  );
}
