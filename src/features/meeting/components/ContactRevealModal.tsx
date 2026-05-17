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

        <div className="bg-meeting-surface flex w-full items-center justify-center rounded-2xl px-6 py-4">
          <span className="text-heading-2 text-shark text-center break-all">
            {contact}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="w-full cursor-pointer rounded-2xl border border-gray-200 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          {copied ? '✅ 복사됐어요!' : '연락처 복사하기'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="bg-main-gradient text-button w-full cursor-pointer rounded-2xl py-4 font-bold text-white"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default ContactRevealModal;
