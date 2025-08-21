import { fetchGetItemsArrayForZod } from '@/api/server';
import {
  DataStructureKey,
  StructuredDataSchemas,
} from '@/types/schema/default';
import qs from 'qs';
import { ZodEventArraySchema } from '../type';

type EventSchema = StructuredDataSchemas[DataStructureKey.event];

export const useEvents = async (params = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/app/event?${qs.stringify(params)}`;
  return fetchGetItemsArrayForZod<EventSchema>(url, 60, ZodEventArraySchema);
};
