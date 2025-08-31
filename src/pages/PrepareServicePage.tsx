import TextType from '../components/share/TextType';

const PrepareServicePage = () => {
  return (
    <>
      <div className="relative flex h-screen flex-col items-center justify-center">
        <span className="text-bold mb-30 text-3xl">
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
