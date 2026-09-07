import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { label: '개인정보처리방침', href: '/privacy', external: false },
  {
    label: '팀 소개',
    href: 'https://boulder-tarragon-1e1.notion.site/25e37c6398ec80fbad4af8be1a0e8bbe',
    external: true,
  },
  {
    label: '버그/장소 문의',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfKxqv3DOODXozNiTVC9rmVv5KcUV6pnBeyFjUtgqjdilUCCQ/viewform?usp=dialog',
    external: true,
  },
];

const linkStyle = 'border-b border-b-gray-300 transition hover:text-gray-900';

const Footer = () => {
  return (
    // 원래는 5개 항목이 전부 "라벨 + 값" 2줄이라 모바일에서 380px였다.
    // 그중 3개는 라벨이 곧 링크 이름이고 값("바로가기", "구글 폼 링크")은
    // 정보를 담고 있지 않아서, 라벨 자체를 링크로 만들어 한 줄로 합쳤다.
    //
    // pb-18(72px): 메인 하단의 제휴맵 FAB이 링크를 덮지 않게 비워둔다.
    // 56px이면 충분하지만, footer 자체의 아래 숨통(pt-8과 균형)도 필요하다.
    // FAB은 bottom-2(8px) + h-12(48px)라 화면 바닥에서 56px까지 차지한다.
    // sm 이상에서도 줄일 수 없다. 좌우로 갈라져 가운데가 비는 건 맞지만,
    // 640~800px에서는 링크 줄이 350px쯤이라 중앙 FAB까지 닿는다.
    // (현재 Footer는 메인에서만 쓰인다. Layout으로 옮기면 FAB이 없는
    //  페이지에도 이 여백이 생기므로 그때 prop으로 빼는 게 맞다)
    //
    // gray-400은 gray-100 배경에서 대비가 2.35:1로 WCAG AA(4.5:1)에
    // 한참 못 미친다. gray-600은 6.88:1이다.
    <footer className="mt-20 w-full bg-gray-100 pt-8 pb-18 text-sm text-gray-600">
      {/* 바로 위 ItemContainer가 mx-auto max-w-7xl + px-4라 축을 맞춘다 */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <nav
          aria-label="푸터"
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start"
        >
          {FOOTER_LINKS.map((link, index) => (
            <span key={link.href} className="flex items-center gap-x-2">
              {link.external ? (
                // 노션/구글 폼은 외부 사이트라 새 탭으로 연다. 같은 탭에서
                // 열면 뒤로가기로 돌아왔을 때 메인이 처음부터 다시 로드된다.
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkStyle}
                >
                  {link.label}
                </a>
              ) : (
                // 일반 <a>를 쓰면 브라우저 네비게이션이 일어나 앱이 통째로
                // 다시 마운트된다(로그인 상태·쿼리 캐시 초기화).
                <Link to={link.href} className={linkStyle}>
                  {link.label}
                </Link>
              )}
              {/* 구분자를 링크 앞에 두면 375px 이하에서 줄바꿈될 때
                  둘째 줄이 "· 버그 문의..."처럼 점부터 시작한다.
                  뒤에 두면 첫 줄이 "· "로 끝나 이어지는 것처럼 읽힌다. */}
              {index < FOOTER_LINKS.length - 1 && (
                <span aria-hidden className="text-gray-400">
                  ·
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* 링크에 이미 밑줄이 있어서 구분선을 더 그으면 가로선이 겹쳐 보인다.
            footer 자체가 회색 배경으로 분리돼 있으니 여백으로만 나눈다. */}
        <div className="flex flex-col items-center gap-1 sm:items-end sm:text-right">
          <a
            href="mailto:sejonglife2025@gmail.com"
            className="w-fit transition hover:text-gray-900"
          >
            sejonglife2025@gmail.com
          </a>
          <p>© sejonglife. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
