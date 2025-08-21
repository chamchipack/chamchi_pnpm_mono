// ✅ 상품 정보
export type GroupedOption = {
  name: string; // 옵션 제목
  options: { name: string; value: string; _id: string }[]; // 상세 옵션들
};

export type ProductOptions = {
  title: string;
  type: 'text' | 'image' | 'etc';
  _id: string;
  options: null | { content: string; price: number; _id: string }[];
};

export interface ProductSchema {
  _id: string;
  sellerId: SellerSchema;
  description: string;
  name: string;
  image: string[];
  price: number;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  orderCount?: number;
  isActive: boolean;
  updatedAt: Date;
  options: ProductOptions[];
}
