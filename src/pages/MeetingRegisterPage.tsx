import { useState } from 'react';
import FunnelProgressBar from '../features/meeting/components/FunnelProgressBar';
import GenderStep from '../features/meeting/components/GenderStep';
import FaceTypeStep from '../features/meeting/components/FaceTypeStep';
import BirthYearStep from '../features/meeting/components/BirthYearStep';
import HobbyStep from '../features/meeting/components/HobbyStep';
import DesiredDateStep from '../features/meeting/components/DesiredDateStep';
import ContactStep from '../features/meeting/components/ContactStep';
import { useRegisterProfile } from '../features/meeting/hooks/useRegisterProfile';

const TOTAL_STEPS = 6;

interface RegisterFormState {
  gender: '남' | '여' | null;
  faceType: string | null;
  birthYear: number;
  hobby: string;
  desiredDate: string;
  contact: string;
}

function MeetingRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState<RegisterFormState>({
    gender: null,
    faceType: null,
    birthYear: 2002,
    hobby: '',
    desiredDate: '',
    contact: '',
  });

  const { mutate: registerProfile, isPending } = useRegisterProfile();

  const isCurrentStepValid = () => {
    if (currentStep === 1) return formState.gender !== null;
    if (currentStep === 2) return formState.faceType !== null;
    if (currentStep === 3) return true;
    if (currentStep === 4) return formState.hobby.trim().length > 0;
    if (currentStep === 5) return formState.desiredDate.trim().length > 0;
    if (currentStep === 6) return formState.contact.trim().length > 0;
    return false;
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((previous) => previous + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  const handleSubmit = () => {
    if (
      !formState.gender ||
      !formState.faceType ||
      !formState.hobby.trim() ||
      !formState.desiredDate.trim() ||
      !formState.contact.trim()
    ) {
      return;
    }

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

  return (
    <div className="bg-alabaster mx-auto flex min-h-screen w-full max-w-[448px] flex-col">
      <FunnelProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      <div className="flex flex-1 flex-col px-6 pt-6 pb-4">
        <div className="flex-1">
          {currentStep === 1 && (
            <GenderStep
              value={formState.gender}
              onChange={(gender) =>
                setFormState((previous) => ({ ...previous, gender }))
              }
            />
          )}
          {currentStep === 2 && (
            <FaceTypeStep
              value={formState.faceType}
              onChange={(faceType) =>
                setFormState((previous) => ({ ...previous, faceType }))
              }
            />
          )}
          {currentStep === 3 && (
            <BirthYearStep
              value={formState.birthYear}
              onChange={(birthYear) =>
                setFormState((previous) => ({ ...previous, birthYear }))
              }
            />
          )}
          {currentStep === 4 && (
            <HobbyStep
              value={formState.hobby}
              onChange={(hobby) =>
                setFormState((previous) => ({ ...previous, hobby }))
              }
            />
          )}
          {currentStep === 5 && (
            <DesiredDateStep
              value={formState.desiredDate}
              onChange={(desiredDate) =>
                setFormState((previous) => ({ ...previous, desiredDate }))
              }
            />
          )}
          {currentStep === 6 && (
            <ContactStep
              value={formState.contact}
              onChange={(contact) =>
                setFormState((previous) => ({ ...previous, contact }))
              }
            />
          )}
        </div>
        <div className="mt-4 flex flex-col gap-0">
          <button
            type="button"
            onClick={handleNext}
            disabled={!isCurrentStepValid() || isPending}
            className={`text-button w-full cursor-pointer rounded-2xl py-4 font-bold text-white transition-opacity ${
              isCurrentStepValid() && !isPending
                ? 'bg-main-gradient'
                : 'bg-main-gradient cursor-not-allowed opacity-40'
            }`}
          >
            {currentStep === TOTAL_STEPS ? '제출하기' : '다음'}
          </button>
          {currentStep > 1 && (
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
      </div>
    </div>
  );
}

export default MeetingRegisterPage;
