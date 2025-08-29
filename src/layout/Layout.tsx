import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-[68px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
