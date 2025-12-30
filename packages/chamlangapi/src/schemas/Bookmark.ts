import { Schema, model, models, InferSchemaType, Types } from 'mongoose';

export const BookmarkRefTypes = ['word', 'blog', 'example'] as const;
export type BookmarkRefType = (typeof BookmarkRefTypes)[number];

const BookmarkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // 폴리모픽 참조
    refType: {
      type: String,
      enum: BookmarkRefTypes,
      required: true,
      index: true,
    },
    // 원본 문서의 _id (ObjectId가 권장. 혹은 문자열 ID라면 String으로 변경)
    refId: { type: Schema.Types.ObjectId, required: true, index: true },

    // 선택 메타
    note: { type: String, default: undefined },
    tags: { type: [String], default: undefined },

    // 비정규화 카운터 등 필요 시 (선택)
    // sourceSnapshot: { type: Schema.Types.Mixed, default: undefined },
  },
  { timestamps: true },
);

// 같은 대상 중복 북마크 방지
BookmarkSchema.index({ userId: 1, refType: 1, refId: 1 }, { unique: true });

// 타입별/최신순 조회 최적화
BookmarkSchema.index({ userId: 1, refType: 1, createdAt: -1 });

// 특정 대상의 북마크 수 집계 최적화 (옵션)
BookmarkSchema.index({ refType: 1, refId: 1 });

export type BookmarkDoc = InferSchemaType<typeof BookmarkSchema> & {
  _id: Types.ObjectId;
};

export const Bookmark =
  models.Bookmark || model<BookmarkDoc>('Bookmark', BookmarkSchema, 'Bookmark');
