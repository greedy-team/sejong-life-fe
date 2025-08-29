import TextType from '../components/share/TextType';

const PrepareServicePage = () => {
  return (
    <>
      <div className="relative mt-[-50px] flex h-screen flex-col items-center justify-center">
        <span className="text-bold text-3xl">
          <TextType
            as="span"
            text={['서비스 준비 중입니다...', '']}
            loop={true}
          />
        </span>
      </div>
    </>
  );
};

export default PrepareServicePage;
