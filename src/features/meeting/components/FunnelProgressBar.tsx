interface FunnelProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

function FunnelProgressBar({
  currentStep,
  totalSteps,
}: FunnelProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex h-12 w-full shrink-0 flex-col items-start px-4 py-4">
      <div className="flex h-4 w-full flex-row items-center gap-3">
        <div className="bg-athens-gray relative h-1.5 flex-1 rounded-full">
          <div
            className="bg-main-gradient absolute top-0 bottom-0 left-0 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-caption text-jumbo shrink-0">
          {currentStep}/{totalSteps}
        </span>
      </div>
    </div>
  );
}

export default FunnelProgressBar;
