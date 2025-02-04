import { Box } from '@mui/material';
import CardComponent from '../Test';
import HeaderContainer from '@/components/Layout/Header/client/HeaderContainer';
import BackgroundImageBox from './BackgroundImageBox';
import IntroductionBox from './IntroductionBox';
import ScrollModal from './ScrollModal'; // 모달 컴포넌트 추가
import { getData } from '@/api/module/fetch';
import { menuItems } from '@/config/menu/menu';

const Container = async () => {
  const parameter = {
    target: 'library',
    type: 'search',
    options: {},
    sort: {},
  };

  const result = await getData(parameter);
  const list: any[] = result?.data?.items || [];

  const params = {
    target: 'blog_menu',
    type: 'search',
    options: {},
    sort: {},
  };
  let record = [];
  try {
    const result = await getData(params);
    record = result?.data?.items;
  } catch {
    record = menuItems;
  }

  return (
    <>
      <HeaderContainer menu={record || []} />
      <ScrollModal /> {/* 스크롤 모달 추가 */}
      {/* 메인 레이아웃 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '60vh', md: '100vh' },
          backgroundImage: 'url(/backgroundtheme.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <BackgroundImageBox />
        <IntroductionBox />
      </Box>
      <CardComponent data={list} />
    </>
  );
};

export default Container;
