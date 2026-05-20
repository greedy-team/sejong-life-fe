const MAX_LENGTH = 100;

interface ContactStepProps {
  value: string;
  onChange: (contact: string) => void;
}

function ContactStep({ value, onChange }: ContactStepProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= MAX_LENGTH) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-1 pb-1">
      <div className="flex w-full flex-col gap-1 pb-1">
        <h2 className="text-heading-1 text-shark">연락처를 알려주세요</h2>
        <p className="text-body-regular text-jumbo">
          매칭 후 연락할 수단을 입력해주세요
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 pt-4">
        <div className="w-full">
          <div className="border-iron box-border w-full rounded-xl border px-6 py-3">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="예: 인스타그램 @my_instagram / 연락처 010-1234-5678"
              maxLength={MAX_LENGTH}
              aria-label="연락처"
              className="text-caption text-shark w-full bg-transparent outline-none placeholder:text-[#B9B9B9]"
            />
          </div>
          <div className="mt-1 flex justify-end">
            <span className="text-char-count text-[#B9B9B9]">
              {value.length}/{MAX_LENGTH}
            </span>
          </div>
        </div>
        <p className="text-caption text-jumbo">
          💡 상대방이 회원님의 프로필을 뽑으면 입력하신 연락처가 공개돼요.
          편하게 연락받을 수 있는 수단으로 적어주세요!
        </p>
        <p className="text-caption text-jumbo">
          ⚠️ 거짓 정보 입력 시 무통보 삭제될 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default ContactStep;
