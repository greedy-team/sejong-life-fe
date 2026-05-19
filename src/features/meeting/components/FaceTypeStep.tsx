import { FACE_TYPES } from '../constants/meetingConstants';

interface FaceTypeStepProps {
  value: string | null;
  onChange: (faceType: string) => void;
}

function FaceTypeStep({ value, onChange }: FaceTypeStepProps) {
  return (
    <div className="flex w-full flex-col items-start gap-1 pb-1">
      <div className="flex w-full flex-col gap-1 pb-1">
        <h2 className="text-heading-1 text-shark">당신의 동물상은?</h2>
        <p className="text-body-regular text-jumbo">닮은 동물을 골라주세요</p>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 pt-4">
        {FACE_TYPES.map(({ value: faceValue, label, emoji }) => (
          <button
            key={faceValue}
            type="button"
            onClick={() => onChange(faceValue)}
            className={`flex h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border transition-colors ${
              value === faceValue
                ? 'bg-main-gradient border-transparent'
                : 'border-iron hover:border-mandy bg-white'
            }`}
          >
            <span className="text-[46.9px] leading-[48px]">{emoji}</span>
            <span
              className={`text-body-bold ${value === faceValue ? 'text-white' : 'text-shark'}`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FaceTypeStep;
