'use client';

import HeadComponent from '@/components/common/HeadComponent';
import AnnouncementContainer from './announcement/client/Container';
import FAQContainer from './faq/client/Container';
import TermsContainer from './terms/Container';

interface Props {
  policy: MenuValue;
}

type MenuValue =
  | 'faq'
  | 'terms-and-policies'
  | 'announcement'
  | 'customer-support';

const menuItemsMap: Record<MenuValue, string> = {
  faq: '자주 묻는 질문',
  'terms-and-policies': '약관 및 정책',
  announcement: '공지사항',
  'customer-support': '고객센터',
};

const ComponentDrawing: Record<MenuValue, JSX.Element> = {
  faq: <FAQContainer />,
  'terms-and-policies': <TermsContainer type="terms-and-policies" />,
  announcement: <AnnouncementContainer type="announcement" />,
  'customer-support': (
    <p className="text-sm text-gray-500">고객센터 페이지 준비 중</p>
  ),
};

export default function Container({ policy }: Props) {
  return (
    <div className="py-4">
      <div className="px-4">
        <HeadComponent
          isLeftButtonVisable={true}
          title={menuItemsMap[policy] || '약관 및 정책'}
        />
      </div>

      <div className="px-4">{ComponentDrawing[policy]}</div>
    </div>
  );
}
