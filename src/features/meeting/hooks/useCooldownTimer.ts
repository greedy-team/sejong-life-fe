import { useEffect, useRef, useState } from 'react';

export const useCooldownTimer = (
  initialSeconds: number,
  onExpire: () => void,
) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    setRemainingSeconds(initialSeconds);

    if (initialSeconds <= 0) return;

    const intervalId = setInterval(() => {
      setRemainingSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(intervalId);
          onExpireRef.current();
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialSeconds]);

  return remainingSeconds;
};
