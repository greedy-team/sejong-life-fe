import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-1">
        <div className="w-full max-w-[1920px]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
