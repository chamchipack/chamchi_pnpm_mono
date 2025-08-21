import { ProductSchema } from '@/types/schema/ProductSchema';

export default function SSR_ProductDefaultInfo({
  productData,
}: {
  productData: ProductSchema;
}) {
  return (
    <div className="w-full">
      {/* 상품명 */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold my-2">{productData?.name}</h2>

        {/* 가격 */}
        <p className="text-lg font-semibold">
          {productData?.price.toLocaleString()}
          <span className="ml-1">원</span>
        </p>
      </div>

      {/* 설명 */}
      {productData?.description && (
        <p className="text-sm text-gray-600 whitespace-pre-line break-keep">
          {productData.description}
        </p>
      )}

      {Array.isArray(productData?.tags) && productData.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {productData.tags.map((tag, idx) => (
            <span key={idx} className="mr-1 text-blue-600 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center mt-2 gap-2">
        {productData?.rating && (
          <div className="flex items-center border border-gray-300 w-[50px] rounded-full px-2 py-0.5 text-main text-[12px] font-medium">
            <svg
              className="w-3 h-3 mr-1 fill-main"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {productData.rating.toFixed(1)}
          </div>
        )}

        {productData?.orderCount ? (
          <div className="inline-flex items-center px-2.5 py-1 rounded-sm bg-gray-100 text-xs text-gray-700">
            <span className="mr-1 text-gray-500">누적주문</span>
            <span className="font-semibold text-gray-900">
              {productData.orderCount}건
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
