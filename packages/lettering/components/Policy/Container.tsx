import { Box, Typography } from '@mui/material';
import HeadComponent from '../common/HeadComponent';
import FAQContainer from './faq/Container';
import TermsContainer from './terms/Container';
import NoticesContainer from './notices/Container';

interface Props {
  policy: MenuValue;
}

type MenuValue = 'faq' | 'terms-and-policies' | 'notices' | 'customer-support';

type MenuItemsMap = Record<MenuValue, string>;

const menuItemsMap: MenuItemsMap = {
  faq: '자주 묻는 질문',
  'terms-and-policies': '약관 및 정책',
  notices: '공지사항',
  'customer-support': '고객센터',
};

// ✅ 각 메뉴에 대응하는 컴포넌트 매핑
const ComponentDrawing: Record<MenuValue, JSX.Element> = {
  faq: <FAQContainer />,
  'terms-and-policies': <TermsContainer type="terms-and-policies" />,
  notices: <NoticesContainer type="notices" />,
  'customer-support': <Typography>고객센터 페이지 준비 중</Typography>,
};

export default function Container({ policy }: Props) {
  return (
    <>
      <Box sx={{ py: 1.5 }}>
        <Box sx={{ px: 2 }}>
          <HeadComponent
            isLeftButtonVisable={true}
            title={menuItemsMap[policy] || '약관 및 정책'}
          />
        </Box>

        {/* ✅ 해당 메뉴의 컴포넌트 렌더링 */}
        <Box sx={{ px: 2 }}>{ComponentDrawing[policy]}</Box>
      </Box>
    </>
  );
}
