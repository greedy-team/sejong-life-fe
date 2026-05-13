interface GenderStepProps {
  value: 'MALE' | 'FEMALE' | null;
  onChange: (gender: 'MALE' | 'FEMALE') => void;
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
          onClick={() => onChange('MALE')}
          className={`flex h-[163px] flex-1 cursor-pointer flex-col items-center justify-center rounded-3xl border transition-colors ${
            value === 'MALE'
              ? 'bg-main-gradient border-transparent'
              : 'border-iron hover:border-mandy bg-white'
          }`}
        >
          <span className="mb-2 text-[46.9px] leading-[48px]">🙋‍♂️</span>
          <span
            className={`text-button ${value === 'MALE' ? 'text-white' : 'text-shark'}`}
          >
            남성
          </span>
        </button>
        <button
          type="button"
          onClick={() => onChange('FEMALE')}
          className={`flex h-[163px] flex-1 cursor-pointer flex-col items-center justify-center rounded-3xl border transition-colors ${
            value === 'FEMALE'
              ? 'bg-main-gradient border-transparent'
              : 'border-iron hover:border-mandy bg-white'
          }`}
        >
          <span className="mb-2 text-[46.9px] leading-[48px]">🙋‍♀️</span>
          <span
            className={`text-button ${value === 'FEMALE' ? 'text-white' : 'text-shark'}`}
          >
            여성
          </span>
        </button>
      </div>
    </div>
  );
}

export default GenderStep;
