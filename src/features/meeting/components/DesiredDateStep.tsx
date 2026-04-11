const MAX_LENGTH = 100;

interface DesiredDateStepProps {
  value: string;
  onChange: (desiredDate: string) => void;
}

function DesiredDateStep({ value, onChange }: DesiredDateStepProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= MAX_LENGTH) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-1 pb-1">
      <div className="flex w-full flex-col gap-1 pb-1">
        <h1 className="text-heading-1 text-shark">원하는 데이트는?</h1>
        <p className="text-body-regular text-jumbo">
          하고싶은 데이트를 적어주세요
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 pt-4">
        <div className="w-full">
          <div className="border-iron box-border min-h-[100px] w-full rounded-xl border p-3">
            <textarea
              value={value}
              onChange={handleChange}
              placeholder="예: 한강에서 치맥하며 수다떨기"
              maxLength={MAX_LENGTH}
              className="text-body-medium text-shark h-[76px] w-full resize-none bg-transparent leading-7 font-medium outline-none placeholder:text-[#B9B9B9]"
            />
          </div>
          <div className="mt-1 flex justify-end">
            <span className="text-char-count text-[#B9B9B9]">
              {value.length}/{MAX_LENGTH}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesiredDateStep;
