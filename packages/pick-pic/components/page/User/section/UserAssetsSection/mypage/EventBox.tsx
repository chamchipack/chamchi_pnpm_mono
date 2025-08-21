export default function EventBox() {
  return (
    <div className="flex justify-between w-full border border-gray-300 rounded-lg p-4 items-center">
      {/* 쿠폰 */}
      <div className="flex flex-col items-center">
        <img
          src="/coupon.png"
          alt="쿠폰"
          className="w-10 h-10 object-contain"
        />
        <span className="text-sm font-bold mt-1">쿠폰</span>
      </div>

      {/* 포인트 */}
      <div className="flex flex-col items-center">
        <img
          src="/coin.png"
          alt="포인트"
          className="w-10 h-10 object-contain"
        />
        <span className="text-sm font-bold mt-1">포인트</span>
      </div>
    </div>
  );
}
