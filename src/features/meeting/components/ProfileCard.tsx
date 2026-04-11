import type { Profile } from '../../../types/meetingType';
import { CURRENT_YEAR, FACE_TYPE_EMOJI } from '../constants/meetingConstants';

interface ProfileCardProps {
  profile: Profile;
  onOpen: (profileId: number) => void;
}

function ProfileCard({ profile, onOpen }: ProfileCardProps) {
  const emoji = FACE_TYPE_EMOJI[profile.faceType] ?? '😊';
  const age = CURRENT_YEAR - profile.birthYear;
  const hobbyTags = profile.hobby
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <button
      type="button"
      onClick={() => onOpen(profile.id)}
      className="bg-card-gradient isolation-isolate relative flex w-full cursor-pointer flex-col items-start overflow-hidden rounded-3xl p-5 text-left"
    >
      <div
        className="pointer-events-none absolute"
        style={{
          width: 96,
          height: 96,
          right: -24,
          top: -24,
          background: 'rgba(255, 255, 255, 0.2)',
          filter: 'blur(12px)',
          borderRadius: 9999,
          zIndex: 0,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          right: 15.86,
          bottom: 8,
          opacity: 0.2,
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: 72, lineHeight: '72px' }}>{emoji}</span>
      </div>
      <div
        className="relative flex w-full flex-col gap-3"
        style={{ zIndex: 2 }}
      >
        <div className="flex w-full flex-row items-center gap-3">
          <div
            className="flex shrink-0 items-center justify-center"
            style={{
              width: 56,
              height: 56,
              background: 'rgba(255, 255, 255, 0.6)',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(4px)',
              borderRadius: 16,
            }}
          >
            <span style={{ fontSize: 30, lineHeight: '36px' }}>{emoji}</span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-button text-shark leading-6 font-bold">
              {profile.faceType}
            </span>
            <span className="text-body-regular text-jumbo">{age}세</span>
          </div>
        </div>
        <div
          className="flex w-full flex-col items-start px-4"
          style={{
            paddingTop: 11.3,
            paddingBottom: 12,
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(2px)',
            borderRadius: 16,
          }}
        >
          <span className="text-body-medium text-shark">
            💭 &quot;{profile.desiredDate}&quot;
          </span>
        </div>
        {hobbyTags.length > 0 && (
          <div className="flex flex-row flex-wrap gap-1.5">
            {hobbyTags.map((tag) => (
              <span
                key={tag}
                className="text-caption text-shark px-3 py-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: 9999,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

export default ProfileCard;
