interface CoinIconProps {
  className?: string;
}

function CoinIcon({ className }: CoinIconProps) {
  return (
    <img
      src="/asset/meeting/coinIcon.svg"
      alt="coin"
      className={className}
      aria-hidden="true"
    />
  );
}

export default CoinIcon;
