// models/example.ts
import { Schema, model, models, InferSchemaType, Types } from 'mongoose';

const TokenSchema = new Schema(
  {
    jp: { type: String, required: true }, // 토큰 원문(한자/가나)
    reading: { type: String, default: undefined }, // 후리가나(있으면)
  },
  { _id: false },
);

const ExampleSchema = new Schema(
  {
    /** 본문 */
    jp: { type: String, required: true }, // 일본어 문장
    tokens: { type: [TokenSchema], default: [] }, // 루비 표시용 토큰(선택)
    ko: { type: String, required: true }, // 한국어 번역
    ro: { type: String, default: undefined }, // 로마자(선택)

    /** 연결 관계: 여러 단어와 매칭 */
    wordIds: [{ type: Schema.Types.ObjectId, ref: 'Word', index: true }], // 다대다 참조

    /** 메타(선택) */
    jlpt: {
      type: String,
      enum: ['N1', 'N2', 'N3', 'N4', 'N5'],
      index: true,
      default: undefined,
    },
    tags: { type: [String], default: undefined }, // 검색/필터용 태그
    source: { type: String, default: undefined }, // 출처(예: 도서/URL)
    notes: { type: String, default: undefined }, // 주석

    /** 생성/검수 정보(선택) */
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: undefined },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

/** 검색 성능용 인덱스 (필요에 맞게 선택) */
// 일본어/로마자/한국어 문장 검색
ExampleSchema.index({ jp: 'text', ko: 'text', ro: 'text' });
// 토큰 jp로도 간단 검색하고 싶다면(부분검색은 정규식이 보통 더 낫습니다)
ExampleSchema.index({ 'tokens.jp': 1 });
// 태그 + JLPT 필터 조합
ExampleSchema.index({ jlpt: 1, tags: 1 });

export const Example =
  models.Example || model('Example', ExampleSchema, 'Example');

export type ExampleDoc = InferSchemaType<typeof ExampleSchema>;
