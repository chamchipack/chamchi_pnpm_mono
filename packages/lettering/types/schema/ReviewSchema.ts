// ✅ 리뷰 정보
interface ReviewSchema {
  _id: string;
  orderId: string;
  userId: string;
  sellerId: string;
  star: number;
  content: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
