// models/vocabulary.ts
import { Schema, model, models, Types } from 'mongoose';

const VocabularySchema = new Schema(
  {
    /** 시스템 제공 단어장 여부 */
    system: { type: Boolean, default: false, index: true },

    /** 사용자 단어장일 때만 필수 (system=false) */
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: function (this: any) {
        return !this.system;
      },
      index: true,
    },

    /** 기본 정보 */
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    color: { type: String, default: '#0A84FF' }, // UI용 색상
    tags: { type: [String], default: [], index: true },

    /** 단어 목록 (Word 참조) */
    words: [{ type: Schema.Types.ObjectId, ref: 'Word' }],
  },
  {
    timestamps: true,
  },
);

/**
 * 고유 인덱스
 * - 시스템 단어장: title 유니크
 * - 사용자 단어장: (userId, title) 유니크
 */
VocabularySchema.index(
  { title: 1 },
  { unique: true, partialFilterExpression: { system: true } },
);
VocabularySchema.index(
  { userId: 1, title: 1 },
  { unique: true, partialFilterExpression: { system: false } },
);

export const Vocabulary =
  models.Vocabulary || model('Vocabulary', VocabularySchema, 'Vocabulary');
