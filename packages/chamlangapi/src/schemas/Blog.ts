import { model, Schema } from 'mongoose';

export const ArticleSchema = new Schema(
  {
    markdown_title: { type: String, required: true }, // 제목
    markdown_contents: { type: String, required: true }, // 본문 (Markdown)
    summary: { type: String, default: '' }, // 요약
    category: { type: String, default: '' }, // 카테고리
    thumbnail: { type: String, default: '' }, // 썸네일 URL
    userId: { type: String, required: true }, // 작성자 ID
    userName: { type: String, required: true }, // 작성자 이름
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  },
);

// Article 모델 생성 (컬렉션명: "Article")
export const Article = model('Article', ArticleSchema, 'library');
