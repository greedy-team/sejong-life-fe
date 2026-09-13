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
    <footer className="mt-20 w-full bg-gray-100 pt-8 pb-18 text-sm text-gray-600">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <nav
          aria-label="푸터"
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start"
        >
          {FOOTER_LINKS.map((link, index) => (
            <span key={link.href} className="flex items-center gap-x-2">
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkStyle}
                >
                  {link.label}
                </a>
              ) : (
                <Link to={link.href} className={linkStyle}>
                  {link.label}
                </Link>
              )}
              {index < FOOTER_LINKS.length - 1 && (
                <span aria-hidden className="text-gray-400">
                  ·
                </span>
              )}
            </span>
          ))}
        </nav>

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
