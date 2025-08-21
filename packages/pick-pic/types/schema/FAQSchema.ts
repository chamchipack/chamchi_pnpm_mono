import { z } from 'zod';

export const FAQZodType = z.object({
  _id: z.string(),
  question: z.string(),
  answer: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FAQSchema = z.infer<typeof FAQZodType>;
