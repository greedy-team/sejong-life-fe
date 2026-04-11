import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FunnelProgressBar from '../features/meeting/components/FunnelProgressBar';
import GenderStep from '../features/meeting/components/GenderStep';
import FaceTypeStep from '../features/meeting/components/FaceTypeStep';
import BirthYearStep from '../features/meeting/components/BirthYearStep';
import TextareaStep from '../features/meeting/components/TextareaStep';
import ContactStep from '../features/meeting/components/ContactStep';
import { useRegisterProfile } from '../features/meeting/hooks/useRegisterProfile';

const STEPS = [
  'gender',
  'faceType',
  'birthYear',
  'hobby',
  'desiredDate',
  'contact',
] as const;

type StepKey = (typeof STEPS)[number];

interface RegisterFormState {
  gender: '남' | '여' | null;
  faceType: string | null;
  birthYear: number;
  hobby: string;
  desiredDate: string;
  contact: string;
}

const STEP_VALIDATION: Record<StepKey, (state: RegisterFormState) => boolean> =
  {
    gender: (state) => state.gender !== null,
    faceType: (state) => state.faceType !== null,
    birthYear: () => true,
    hobby: (state) => state.hobby.trim().length > 0,
    desiredDate: (state) => state.desiredDate.trim().length > 0,
    contact: (state) => state.contact.trim().length > 0,
  };

function MeetingRegisterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const stepParam = searchParams.get('step') as StepKey | null;
  const currentStepKey: StepKey =
    stepParam !== null && (STEPS as readonly string[]).includes(stepParam)
      ? stepParam
      : 'gender';
  const currentStepIndex = STEPS.indexOf(currentStepKey);

  const [formState, setFormState] = useState<RegisterFormState>({
    gender: null,
    faceType: null,
    birthYear: 2002,
    hobby: '',
    desiredDate: '',
    contact: '',
  });

  const { mutate: registerProfile, isPending } = useRegisterProfile();

  useEffect(() => {
    if (currentStepIndex > 0 && formState.gender === null) {
      setSearchParams({ step: 'gender' }, { replace: true });
    }
  }, []);

  const isCurrentStepValid = STEP_VALIDATION[currentStepKey](formState);

  const updateFormState =
    <K extends keyof RegisterFormState>(key: K) =>
    (value: RegisterFormState[K]) =>
      setFormState((previous) => ({ ...previous, [key]: value }));

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setSearchParams({ step: STEPS[currentStepIndex + 1] });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (!formState.gender || !formState.faceType) return;

    registerProfile({
      gender: formState.gender,
      faceType: formState.faceType,
      birthYear: formState.birthYear,
      hobby: formState.hobby.trim(),
      desiredDate: formState.desiredDate.trim(),
      contact: formState.contact.trim(),
      remainPickCount: 5,
    });
  };

  const renderStep = () => {
    switch (currentStepKey) {
      case 'gender':
        return (
          <GenderStep
            value={formState.gender}
            onChange={updateFormState('gender')}
          />
        );
      case 'faceType':
        return (
          <FaceTypeStep
            value={formState.faceType}
            onChange={updateFormState('faceType')}
          />
        );
      case 'birthYear':
        return (
          <BirthYearStep
            value={formState.birthYear}
            onChange={updateFormState('birthYear')}
          />
        );
      case 'hobby':
        return (
          <TextareaStep
            title="취미/특기를 알려주세요"
            description="자신의 취미나 특기를 적어주세요"
            placeholder="예: 한강에서 치맥하며 수다떨기"
            value={formState.hobby}
            onChange={updateFormState('hobby')}
          />
        );
      case 'desiredDate':
        return (
          <TextareaStep
            title="원하는 데이트는?"
            description="하고싶은 데이트를 적어주세요"
            placeholder="예: 한강에서 치맥하며 수다떨기"
            value={formState.desiredDate}
            onChange={updateFormState('desiredDate')}
          />
        );
      case 'contact':
        return (
          <ContactStep
            value={formState.contact}
            onChange={updateFormState('contact')}
          />
        );
    }
  };

  return (
    <main className="bg-alabaster mx-auto flex min-h-screen w-full max-w-[448px] flex-col">
      <FunnelProgressBar
        currentStep={currentStepIndex + 1}
        totalSteps={STEPS.length}
      />
      <form
        className="flex flex-1 flex-col px-6 pt-6 pb-4"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex-1">{renderStep()}</div>
        <div className="mt-4 flex flex-col gap-0">
          <button
            type={currentStepIndex === STEPS.length - 1 ? 'submit' : 'button'}
            onClick={handleNext}
            disabled={!isCurrentStepValid || isPending}
            className={`text-button w-full cursor-pointer rounded-2xl py-4 font-bold text-white transition-opacity ${
              isCurrentStepValid && !isPending
                ? 'bg-main-gradient'
                : 'bg-main-gradient cursor-not-allowed opacity-40'
            }`}
          >
            {currentStepIndex === STEPS.length - 1 ? '제출하기' : '다음'}
          </button>
          {currentStepIndex > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="text-body-medium w-full cursor-pointer py-7 text-center font-medium"
              style={{ color: '#8F8F8F' }}
            >
              ← 이전으로
            </button>
          )}
        </div>
      </form>
    </main>
  );
}

export default MeetingRegisterPage;
