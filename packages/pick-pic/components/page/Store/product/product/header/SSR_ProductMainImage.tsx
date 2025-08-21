import SellerMainImageSection from '@/components/page/Store/view/store/main-image/SellerMainImageSection';

export default function SSR_ProductMainImage({
  image = [],
}: {
  image: string[];
}) {
  return (
    <div
      className={`w-full flex items-center justify-center relative overflow-hidden ${
        image.length > 0 ? '' : 'bg-gray-100'
      }`}
    >
      {image.length > 0 ? (
        <SellerMainImageSection images={image} marketName={''} isProduct />
      ) : (
        <p className="text-sm text-gray-400">불러올 이미지가 없습니다</p>
      )}
    </div>
  );
}
