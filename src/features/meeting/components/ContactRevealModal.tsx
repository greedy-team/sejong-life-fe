import { useState } from 'react';

interface ContactRevealModalProps {
  contact: string;
  onClose: () => void;
}

function ContactRevealModal({ contact, onClose }: ContactRevealModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contact);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative mx-4 flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl bg-white p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-4xl">💌</span>
          <h2
            id="contact-modal-title"
            className="text-heading-1 text-shark text-center"
          >
            연락처가 공개되었어요!
          </h2>
          <p className="text-center text-sm text-gray-400">
            연락처를 복사하거나 캡처해두세요
          </p>
        </div>

        <div className="bg-meeting-surface flex w-full items-center justify-between gap-3 rounded-2xl px-6 py-4">
          <span className="text-heading-2 text-shark break-all">{contact}</span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="연락처 복사하기"
            className="text-jumbo hover:text-shark shrink-0 cursor-pointer transition-colors"
          >
            {copied ? (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m20 6-11 11-5-5" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full cursor-pointer rounded-2xl border border-gray-200 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default ContactRevealModal;
