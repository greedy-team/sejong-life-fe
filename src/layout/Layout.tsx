import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
