interface ContactRevealModalProps {
  contact: string;
  remainOpenCount: number;
  onClose: () => void;
}

function ContactRevealModal({
  contact,
  remainOpenCount,
  onClose,
}: ContactRevealModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative mx-4 flex w-full max-w-sm flex-col items-center gap-6 rounded-3xl bg-white p-8"
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
          <p className="text-body-regular text-jumbo text-center">
            남은 오픈 횟수: {remainOpenCount}회
          </p>
        </div>
        <div
          className="flex w-full items-center justify-center rounded-2xl px-6 py-4"
          style={{ background: '#F5F3FF' }}
        >
          <span className="text-heading-2 text-shark text-center font-bold break-all">
            {contact}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="bg-main-gradient text-button w-full cursor-pointer rounded-2xl py-4 font-bold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default ContactRevealModal;
