import { ProductSchema } from './ProductSchema';
import { UserSchema } from './UserSchema';

// ✅ 리뷰 정보
export interface ReviewSchema {
  _id: string;
  orderId: string;
  userId: UserSchema;
  productId: ProductSchema;
  sellerId: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
