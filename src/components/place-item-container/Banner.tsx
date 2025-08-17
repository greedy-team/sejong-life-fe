import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative flex h-[300px] w-full items-center justify-center bg-cover bg-center text-center text-white"
      style={{ backgroundImage: "url('/asset/header/sejongUnivImg.png')" }}
    >
      <div className="absolute inset-0 z-10 bg-black opacity-15"></div>
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="mb-4 h-16">
          <img
            src="/asset/header/Logo.svg"
            alt="로고 이미지"
            className="h-full"
          />
        </div>
        <p className="mb-6 text-2xl">
          세종대생의 하루를 더 편하게, <br />
          맛집・카페・공부 공간을 한 번에.
        </p>
        <button
          onClick={() => navigate('/dicover')}
          className="rounded-md bg-red-600 px-6 py-2 font-bold text-white transition-colors duration-300 hover:bg-red-700"
        >
          지금 골라보기
        </button>
      </div>
    </section>
  );
};

export default Banner;
