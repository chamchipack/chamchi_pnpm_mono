import { z } from 'zod';

export const ZodEventSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  isActive: z.boolean(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type EventSchema = z.infer<typeof ZodEventSchema>;
