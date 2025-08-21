import { z } from 'zod';

/** JSON.stringify된 필드의 구조를 검사하는 헬퍼 */
const JsonStringOf = <T extends z.ZodTypeAny>(schema: T) =>
  z.string().superRefine((val, ctx) => {
    try {
      const parsed = JSON.parse(val);
      const r = schema.safeParse(parsed);
      if (!r.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '잘못된 JSON 구조입니다.',
        });
      }
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '유효한 JSON 문자열이 아닙니다.',
      });
    }
  });

/** 하위 아이템들(필요 시 필드명 맞춰 수정) */
const OptionItemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  value: z.number().min(0),
  type: z.string(),
  title: z.string(),
});

const AdditionalProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  count: z.number().int().positive(),
});

/** 최종 form 스키마 (질문 코드의 필드/타입 그대로) */
export const OrderFormSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  sellerId: z.string().min(1),
  phoneNumber: z.union([
    z
      .string()
      .trim()
      .regex(/^[0-9+\-()\s]*$/, '전화번호 형식이 올바르지 않습니다.'),
    z.literal(''), // 빈 문자열 허용
  ]),
  productId: z.string().min(1),

  // 문자열(JSON)로 직렬화된 옵션/추가상품의 내부 구조까지 검사
  options: JsonStringOf(z.array(OptionItemSchema)),
  additionalProducts: JsonStringOf(z.array(AdditionalProductSchema)),

  price: z.number().nonnegative(),
  discount: z.number().min(0),
  totalPrice: z.number().nonnegative(),

  paymentMethod: z.literal('CARD'),
  couponId: z.string().optional(),

  bookingDate: z.date(), // dayjs(date).toDate() 결과
  storeRequest: z.string().optional().nullable(),

  paymentId: z.string().uuid(), // paymentUUID면 uuid 권장
  location: z.string().nullable(),
  locationDetail: z.string().nullable(),
  parcelFee: z.number().min(0),
});

// 사용 예시
// OrderFormSchema.parse(form); // 실패 시 예외 throw
