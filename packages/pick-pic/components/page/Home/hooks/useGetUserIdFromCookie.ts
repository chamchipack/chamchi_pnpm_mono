import { cookies } from 'next/headers';

export default async function useGetUserIdFromCookie() {
  const cookieStore = await cookies();
  const { value = '' } = cookieStore.get('user_id') || {};
  return value;
}
