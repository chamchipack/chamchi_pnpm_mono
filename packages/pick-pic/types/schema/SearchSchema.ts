// ✅ 검색 기록
export interface SearchSchema {
  _id: string;
  keyword: string;
  count: number;
  createdAt: Date;
}

export type SearchFilterValue =
  | ''
  | 'popular'
  | 'rating'
  | 'review'
  | 'bookmark';
