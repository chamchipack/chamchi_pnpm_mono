import CustomerBox from '@/components/common/info/CustomerBox';

export default function CompanyInfoSection() {
  return (
    <div className={`px-4 pt-0 pb-28 text-sm`}>
      <div className="flex justify-between align-center mb-0">
        <h2 className="font-bold text-sm text-gray-800">주식회사 버프</h2>
      </div>

      <hr className="mt-2 mb-3 border-t border-gray-300" />

      <div className="space-y-1 text-gray-600 text-xs">
        <div className="flex">
          <span className="w-[100px] font-medium text-gray-400">
            사업자번호
          </span>
          <span>394-86-03911</span>
        </div>
        <div className="flex">
          <span className="w-[100px] font-medium shrink-0 text-gray-400">
            대표
          </span>
          <span>김동선</span>
        </div>
        <div className="flex">
          <span className="w-[100px] font-medium text-gray-400">업종</span>
          <span>정보통신업, SNS마켓</span>
        </div>
        <div className="flex">
          <span className="w-[100px] font-medium text-gray-400">주소</span>
          <span>광주광역시 북구 효열로 13, 201동 1617호</span>
        </div>
        <div className="flex">
          <span className="w-[100px] font-medium text-gray-400">대표번호</span>
          <span>010-7761-2544</span>
        </div>
      </div>

      <CustomerBox />

      <div className="mt-4">
        <p className="text-start text-gray-500 text-xs">
          © {new Date().getFullYear()} 주식회사 버프. All rights reserved.
        </p>
        <hr className="my-3 border-t border-gray-300" />
        <p className="text-start text-gray-400 text-[11px] leading-relaxed">
          피크피크는 통신 판매 중개자이며, 통신판매의 당사자가 아닙니다. <br />
          따라서 피크피크는 상품 거래정보 및 거래에 대하여 책임을 지지 않습니다.
        </p>
      </div>
    </div>
  );
}
