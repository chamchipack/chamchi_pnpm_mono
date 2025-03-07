// ✅ 상품 정보
interface ProductSchema {
  _id: string;
  sellerId: string;
  image: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  option: { name: string; value: { name: string; price: number }[] }[];
}
