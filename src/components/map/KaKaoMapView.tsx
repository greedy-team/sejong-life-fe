import { useEffect, useRef } from 'react';
import { loadKakaoMap } from '../../lib/map/loadKakaoMap';

type Props = {
  lat?: number;
  lng?: number;
  level?: number;
};

export default function KakaoMapView({
  lat = 37.5519,
  lng = 127.0738,
  level = 4,
}: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const key = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined;
    if (!key) {
      console.error('VITE_KAKAO_JS_KEY가 .env에 없습니다.');
      return;
    }
    if (!mapRef.current) return;

    loadKakaoMap(key)
      .then((kakao) => {
        const center = new kakao.maps.LatLng(lat, lng);
        new kakao.maps.Map(mapRef.current, { center, level });
      })
      .catch((err) => console.error('카카오맵 로드 실패', err));
  }, [lat, lng, level]);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
}
