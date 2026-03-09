import { useNavigate } from 'react-router-dom';

interface HeaderWithBackProps {
  title: string;
  fallbackPath?: string;
  onBack?: () => void;
}

const HeaderWithBack = ({
  title,
  fallbackPath = '/',
  onBack,
}: HeaderWithBackProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath, { replace: true });
  };

  return (
    <header className="sticky z-50 flex h-14 w-full border-b border-b-[#EEEFF1] bg-white px-[5%] py-2 lg:px-15">
      <button onClick={handleBack} className="flex items-center gap-5">
        <div className="flex items-center gap-5">
          <img src="/asset/all-review/backArrow.svg" alt="뒤로가기"></img>
          <span className="font-semibold text-[#354052]">{title}</span>
        </div>
      </button>
    </header>
  );
};

export default HeaderWithBack;
