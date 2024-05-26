import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { FooterCom } from './Footer';

export const Layout: React.FC = () => {

  return (
      <>
        <Header />
        <Outlet />
        <FooterCom />
      </>
  );
};
