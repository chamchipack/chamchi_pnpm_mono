import BodyContainer from '@/components/Layout/BodyContainer';
import HeaderContainer from '@/components/Layout/Header/client/HeaderContainer';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <HeaderContainer />
      <BodyContainer children={children} />
    </>
  );
};

export default Layout;
