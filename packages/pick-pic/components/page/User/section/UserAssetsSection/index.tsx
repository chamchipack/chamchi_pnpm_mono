'use client';

import MyPageFlexBox from './mypage/MyPageFlexBox';

export default function UserAssetsSection() {
  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-4 text-center px-6 my-4">
          <MyPageFlexBox label="나의 리뷰 관리" type="review" />
          <MyPageFlexBox label="찜 리스트" type="bookmark" />
          <MyPageFlexBox label="나의 쿠폰함" type="coupon" />
        </div>
      </div>
    </>
  );
}
