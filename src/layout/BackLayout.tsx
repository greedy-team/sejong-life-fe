import { Outlet } from 'react-router-dom';
import HeaderWithBack from '../components/share/HeaderWithBack';

const BackLayout = () => {
  return (
    <div className="min-h-screen">
      <HeaderWithBack />
      <Outlet />
    </div>
  );
};

export default BackLayout;
