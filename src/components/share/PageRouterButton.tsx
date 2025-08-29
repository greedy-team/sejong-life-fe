import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface PageRouterButtonProps {
  children: ReactNode;
  to: string;
  icon?: string;
}

const PageRouterButton = ({ children, to, icon }: PageRouterButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="relative h-24 w-24 cursor-pointer rounded-2xl border-none bg-gray-100 p-2 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-200"
    >
      {icon && (
        <img src={icon} alt="" className="absolute top-2 left-2 h-8 w-8" />
      )}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        {children}
      </div>
    </button>
  );
};

export default PageRouterButton;
