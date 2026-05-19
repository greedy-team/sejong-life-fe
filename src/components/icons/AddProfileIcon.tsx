interface AddProfileIconProps {
  className?: string;
}

function AddProfileIcon({ className }: AddProfileIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.335"
        y="1.335"
        width="5.33"
        height="5.33"
        rx="1"
        stroke="white"
        strokeWidth="1.333"
      />
      <rect
        x="9.335"
        y="1.335"
        width="5.33"
        height="5.33"
        rx="1"
        stroke="white"
        strokeWidth="1.333"
      />
      <rect
        x="1.335"
        y="9.335"
        width="5.33"
        height="5.33"
        rx="1"
        stroke="white"
        strokeWidth="1.333"
      />
      <path
        d="M9.667 12.333L12.333 12.333M12.333 9.667L12.333 14.999"
        stroke="white"
        strokeWidth="1.333"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default AddProfileIcon;
