const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-16 text-gray-700">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">개인정보처리방침</h1>

        <p>
          세종생활(이하 “서비스”)은 이용자의 개인정보를 중요하게 생각하며, 관련
          법령을 준수합니다. 본 방침은 서비스 이용 시 수집되는 정보와 그 이용
          목적을 안내합니다.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            1. 수집하는 개인정보 항목
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>닉네임 (회원가입 시)</li>
            <li>접속 로그, IP 주소, 브라우저 정보</li>
            <li>쿠키 정보</li>
            <li>리뷰 내용, 평점, 업로드 이미지</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            2. 개인정보 수집 및 이용 목적
          </h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>회원 관리 및 로그인 기능 제공</li>
            <li>리뷰 서비스 운영</li>
            <li>사용자 문의 대응</li>
            <li>서비스 개선 및 통계 분석</li>
            <li>Google AdSense 광고 제공</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            3. 쿠키(Cookie) 사용
          </h2>
          <p>
            서비스는 이용자 경험 개선을 위해 쿠키를 사용할 수 있습니다. 이용자는
            브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            4. 외부 서비스 및 광고
          </h2>
          <p>
            본 서비스는 Google AdSense를 포함한 타사 공급업체의 광고를 게재할 수
            있습니다. Google을 포함한 타사 공급업체는 쿠키를 사용하여 사용자가
            이전에 본 서비스 또는 다른 웹사이트를 방문한 기록을 기반으로 광고를
            게재합니다.
          </p>
          <p>
            Google은 광고 쿠키를 사용함으로써 파트너와 함께 인터넷의 본 서비스
            및 다른 사이트 방문 기록을 기반으로 사용자에게 맞춤 광고를
            제공합니다.
          </p>
          <p>
            이용자는{' '}
            <a
              href="https://myadcenter.google.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              Google 광고 설정
            </a>
            을 방문하여 맞춤설정 광고를 거부할 수 있습니다. 또는{' '}
            <a
              href="https://www.aboutads.info/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              www.aboutads.info
            </a>
            를 방문하여 맞춤설정 광고에 사용되는 타사 공급업체의 쿠키 사용을
            거부할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            5. 개인정보 보관 및 파기
          </h2>
          <p>
            수집된 개인정보는 목적 달성 후 지체 없이 파기합니다. 단, 관련 법령에
            따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">6. 문의처</h2>
          <p>이메일: sejonglife2025@gmail.com</p>
        </section>

        <p className="pt-8 text-sm text-gray-400">시행일: 2026년 3월 2일</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
