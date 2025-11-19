const Footer = () => {
  return (
    <footer className="mt-15 flex h-44 w-full flex-col items-center justify-center gap-6 bg-gray-100 text-gray-400">
      <div className="flex w-full flex-col items-center gap-6 px-4 py-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-6">
          <p className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <span className="font-pretendard-semibold font-semibold text-gray-500">
              Copyright
            </span>
            sejonglife. All rights reserved
          </p>
          <p className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <span className="font-pretendard-semibold font-semibold text-gray-500">
              Contact
            </span>
            sejonglife@gmail.com
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <p className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <span className="font-pretendard-semibold font-semibold text-gray-500">
              세종생활 팀 소개
            </span>
            <a
              href="https://boulder-tarragon-1e1.notion.site/25e37c6398ec80fbad4af8be1a0e8bbe"
              className="border-b border-b-gray-200"
            >
              팀 소개 링크
            </a>
          </p>
          <p className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <span className="font-pretendard-semibold font-semibold text-gray-500">
              버그 문의 및 장소 데이터 요청
            </span>
            <a href="" className="border-b border-b-gray-200">
              구글 폼 링크
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
