import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { termsData, noticesData } from '../content';
import HeadComponent from '@/components/common/HeadComponent';

type MenuValue = 'faq' | 'terms-and-policies' | 'notices' | 'customer-support';

interface Props {
  type: MenuValue;
  id: string;
}

type MenuItemsMap = Record<MenuValue, string>;

const menuItemsMap: MenuItemsMap = {
  faq: '자주 묻는 질문',
  'terms-and-policies': '약관 및 정책',
  notices: '공지사항',
  'customer-support': '고객센터',
};

export default function Container({ type, id }: Props) {
  // ✅ 데이터 매핑
  const dataSource =
    type === 'terms-and-policies'
      ? termsData
      : type === 'notices'
        ? noticesData
        : [];

  // ✅ ID 기반으로 데이터 찾기
  const selectedItem = dataSource.find((item) => item.id.toString() === id);

  return (
    <Box sx={{ py: 1.5 }}>
      <Box sx={{ px: 2 }}>
        <HeadComponent
          isLeftButtonVisable={true}
          title={menuItemsMap[type] || '약관 및 정책'}
        />
      </Box>
      <Box sx={{ px: 2 }}>
        {selectedItem ? (
          <>
            <Typography variant="h6" fontWeight="bold">
              {selectedItem.title}
            </Typography>
            <Typography variant="body2" color="gray">
              {selectedItem.date}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {selectedItem?.content}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" color="error">
            해당 데이터를 찾을 수 없습니다.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
