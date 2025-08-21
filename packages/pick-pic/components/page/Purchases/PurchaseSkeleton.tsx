export default function PurchaseSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2">
        {/* 날짜 & 상세내역 버튼 */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* 가게 정보 및 이미지 */}
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="w-[90px] h-[90px] bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* 상태칩 및 리뷰 작성 */}
        <div className="flex justify-between items-center mt-2">
          <div className="w-16 h-5 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </>
  );
}
