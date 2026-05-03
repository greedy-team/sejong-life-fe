interface TodayConnectionIconProps {
  className?: string;
}

function TodayConnectionIcon({ className }: TodayConnectionIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 2C6.686 2 4 4.686 4 8C4 11.314 6.686 14 10 14C13.314 14 16 11.314 16 8C16 4.686 13.314 4 10 2Z"
        stroke="#EB4763"
        strokeWidth="1.667"
      />
      <path d="M16.667 2.5L14.167 5" stroke="#EB4763" strokeWidth="1.667" />
      <path d="M15 2L17 4" stroke="#EB4763" strokeWidth="1.667" />
      <path
        d="M3.333 14.167L5.833 16.667"
        stroke="#EB4763"
        strokeWidth="1.667"
      />
      <path d="M2.5 15L5 17.5" stroke="#EB4763" strokeWidth="1.667" />
    </svg>
  );
}

export default TodayConnectionIcon;
