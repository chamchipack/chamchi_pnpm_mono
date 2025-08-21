import { useAuthCheck } from '@/api/server/server-api';
import { redirect } from 'next/navigation';
import useGetUserIdFromCookie from '../Home/hooks/useGetUserIdFromCookie';
import UserLayout from './UserLayout';

export default async function UserContainer() {
  const userId = await useGetUserIdFromCookie();

  if (!userId) redirect('/login');

  const result = await useAuthCheck(userId);

  if (!result) redirect('/login');

  return <UserLayout key={userId} {...result} />;
}
