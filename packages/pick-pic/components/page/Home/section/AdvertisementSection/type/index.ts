import { ZodEventSchema } from '@/types/schema/EventSchema';
import { z } from 'zod';

export const ZodEventArraySchema = z.array(ZodEventSchema);
