export default function ReviewSkeleton() {
  return (
    <div className="my-2 mx-2">
      <div className="flex items-start w-full animate-pulse">
        {/* 프로필 이미지 자리 */}
        <div className="w-9 h-9 rounded-full bg-gray-200 mr-2" />

        <div className="flex flex-col flex-1">
          {/* 상단 정보 (닉네임 + 날짜) */}
          <div className="flex justify-between items-center mb-1">
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="w-16 h-3 bg-gray-200 rounded" />
          </div>

          {/* 별점 */}
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
            ))}
          </div>

          {/* 내용 */}
          <div className="space-y-2 mb-2">
            <div className="w-full h-4 bg-gray-200 rounded" />
            <div className="w-3/4 h-4 bg-gray-200 rounded" />
          </div>

          {/* 상품명 */}
          <div className="w-24 h-3 bg-gray-200 rounded mb-2" />

          {/* 이미지 */}
          <div className="w-36 h-36 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
