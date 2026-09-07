import { useCallback, useState } from 'react';
import type { Coordinates } from '../../../types/type';

export type UserLocationStatus = 'idle' | 'loading' | 'success' | 'error';

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 5 * 60 * 1000,
};

export const useUserLocation = () => {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [status, setStatus] = useState<UserLocationStatus>('idle');

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setStatus('success');
      },
      () => {
        setCoords(null);
        setStatus('error');
      },
      GEOLOCATION_OPTIONS,
    );
  }, []);

  return { coords, status, requestLocation };
};
