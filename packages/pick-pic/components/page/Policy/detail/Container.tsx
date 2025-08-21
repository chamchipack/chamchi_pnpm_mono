'use client';

import HeadComponent from '@/components/common/HeadComponent';
import ServerContainer from '../announcement/server/ServerContainer';
import TermContainer from './TermContainer';

type MenuValue =
  | 'faq'
  | 'terms-and-policies'
  | 'announcement'
  | 'customer-support';

interface Props {
  type: MenuValue;
  _id: string;
}

type MenuItemsMap = Record<MenuValue, string>;

const menuItemsMap: MenuItemsMap = {
  faq: '자주 묻는 질문',
  'terms-and-policies': '약관 및 정책',
  announcement: '공지사항',
  'customer-support': '고객센터',
};

const ComponentDrawing: Record<MenuValue, (id: string) => JSX.Element> = {
  faq: () => <div />,
  'terms-and-policies': (id) => <TermContainer _id={id} />,
  announcement: (id) => <ServerContainer type="announcement" _id={id} />,
  'customer-support': () => (
    <div className="text-sm text-gray-500 py-4">고객센터 페이지 준비 중</div>
  ),
};

export default function Container({ type, _id }: Props) {
  return (
    <div className="py-4">
      <div className="px-4">
        <HeadComponent
          isLeftButtonVisable={true}
          title={menuItemsMap[type] || '약관 및 정책'}
        />
      </div>
      <div className="px-4">{ComponentDrawing[type](_id)}</div>
    </div>
  );
}
