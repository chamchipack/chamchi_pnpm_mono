// ✅ 즐겨찾기 (북마크)
interface BookmarkSchema {
  _id: string;
  userId: string;
  sellerId: SellerSchema;
  createdAt: string;
  updatedAt: string;
}
