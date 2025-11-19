import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const LoginModal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutModal(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutModal);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutModal);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="h-fit rounded-md bg-white p-10 shadow-lg sm:w-[60%] lg:w-[30%]"
      >
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full cursor-pointer rounded-md bg-gray-200 p-2 hover:bg-gray-300"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
