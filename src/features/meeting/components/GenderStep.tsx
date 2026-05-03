interface GenderStepProps {
  value: '남' | '여' | null;
  onChange: (gender: '남' | '여') => void;
}

function GenderStep({ value, onChange }: GenderStepProps) {
  return (
    <div className="flex w-full flex-col items-start gap-1 pb-1">
      <div className="flex w-full flex-col gap-1 pb-1">
        <h2 className="text-heading-1 text-shark">성별을 선택해주세요</h2>
        <p className="text-body-regular text-jumbo">하나를 선택해주세요</p>
      </div>
      <div className="flex w-full flex-row gap-4 pt-4">
        <button
          type="button"
          onClick={() => onChange('남')}
          className={`flex h-[163px] flex-1 cursor-pointer flex-col items-center justify-center rounded-3xl border transition-colors ${
            value === '남'
              ? 'bg-main-gradient border-transparent'
              : 'border-iron hover:border-mandy bg-white'
          }`}
        >
          <span className="mb-2 text-[46.9px] leading-[48px]">🙋‍♂️</span>
          <span
            className={`text-button ${value === '남' ? 'text-white' : 'text-shark'}`}
          >
            남성
          </span>
        </button>
        <button
          type="button"
          onClick={() => onChange('여')}
          className={`flex h-[163px] flex-1 cursor-pointer flex-col items-center justify-center rounded-3xl border transition-colors ${
            value === '여'
              ? 'bg-main-gradient border-transparent'
              : 'border-iron hover:border-mandy bg-white'
          }`}
        >
          <span className="mb-2 text-[46.9px] leading-[48px]">🙋‍♀️</span>
          <span
            className={`text-button ${value === '여' ? 'text-white' : 'text-shark'}`}
          >
            여성
          </span>
        </button>
      </div>
    </div>
  );
}

export default GenderStep;
