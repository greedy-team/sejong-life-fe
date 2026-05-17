export const MeetingInfoCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: React.ReactNode;
  description: string;
}) => {
  return (
    <div className="flex w-full items-center gap-4 rounded-[10px] bg-white/85 p-5 shadow-[0_12px_40px_rgba(31,41,55,0.08)] backdrop-blur-md">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-50 text-3xl">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-extrabold text-gray-900">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};
