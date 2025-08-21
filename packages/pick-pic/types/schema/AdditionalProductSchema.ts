// ✅ 추가 상품 정보
interface AdditionalProductSchema {
  _id: string;
  sellerId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
