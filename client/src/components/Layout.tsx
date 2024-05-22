import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout: React.FC = () => {
  return (
    <div>
      <>
        <Header />
        <Outlet />
      </>
    </div>
  );
};