import type { Profile } from '../../../types/meetingType';
import ProfileCard from './ProfileCard';

interface ProfileCardListProps {
  profiles: Profile[];
  onOpenCard: (profileId: number) => void;
}

function ProfileCardList({ profiles, onOpenCard }: ProfileCardListProps) {
  return (
    <ul className="flex w-full flex-col gap-5 px-4 pt-2 pb-8">
      {profiles.map((profile) => (
        <li key={profile.id}>
          <ProfileCard profile={profile} onOpen={onOpenCard} />
        </li>
      ))}
    </ul>
  );
}

export default ProfileCardList;
