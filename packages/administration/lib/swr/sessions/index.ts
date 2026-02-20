import { pb } from '@/lib/pocketbase/server';
import { Session } from '@/lib/type/Session';

export const getSessions = async (): Promise<Session[]> => {
  try {
    const data = await pb.collection('session').getFullList<Session>({
      sort: '-created',
    });

    return data;
  } catch (error: any) {
    console.error('Failed to fetch sessions:', error.message);
    throw new Error('Failed to fetch sessions');
  }
};
