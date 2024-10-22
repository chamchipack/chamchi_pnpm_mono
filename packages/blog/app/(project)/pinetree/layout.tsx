import { getData } from '@/api/module/fetch';
import BodyContainer from '@/components/Layout/BodyContainer';
import HeaderContainer from '@/components/Layout/Header/client/HeaderContainer';
import { menuItems } from '@/config/menu/menu';

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
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
      <HeaderContainer menu={record} />
      <BodyContainer children={children} />
    </>
  );
};

export default Layout;
