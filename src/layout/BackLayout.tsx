import { Outlet } from 'react-router-dom';
import HeaderWithBack from '../features/allReviews/HeaderWithBack';

const BackLayout = () => {
  return (
    <div className="min-h-screen">
      <HeaderWithBack />
      <Outlet />
    </div>
  );
};

export default BackLayout;
