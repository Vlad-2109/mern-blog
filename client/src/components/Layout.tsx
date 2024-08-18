import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { FooterCom } from './Footer';
import { ScrollToTop } from './ScrollToTop';

export const Layout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <FooterCom />
    </>
  );
};
