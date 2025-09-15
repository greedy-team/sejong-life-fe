import TextType from '../share/TextType';

const Banner = () => {
  return (
    <section className="relative flex h-[150px] w-full items-center justify-center bg-white text-center text-gray-800">
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="mb-4 h-16"></div>
        <p className="mb-6 text-2xl sm:text-4xl">
          세종대생의 하루를 더 편하게 <br />
          <span className="font-bold">
            <TextType
              as="span"
              text={['맛집, 카페, 공부 ', '']}
              loop={true}
              textColors={['#77db30']}
              cursorClassName="text-[#a3e077]"
            />
          </span>
          <span className="font-bold text-gray-800"> 공간을 한 번에.</span>
        </p>
      </div>
    </section>
  );
};

export default Banner;
