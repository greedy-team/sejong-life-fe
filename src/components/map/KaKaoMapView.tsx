import { useEffect, useRef, useState } from 'react';
import { loadKakaoMap } from '../../lib/map/loadKakaoMap';
import MapNavigateButton from '../share/MapNavigateButton';
import { useNavigate } from 'react-router-dom';
import { usePartnershipPlacesForMap } from '../../features/map/hooks/usePartnershipPlacesForMap';
import { ICONS } from '../../features/share/constants/icons';
import { PartnershipPlaceCard } from './PartnershipPlaceCard';
import type { PlaceProps } from '../../types/type';

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
  const navigate = useNavigate();
  const { data: places } = usePartnershipPlacesForMap();
  const pinImage = ICONS.greenPin;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceProps | null>(null);

  const openCard = (place: PlaceProps) => {
    setSelectedPlace(place);
    setIsSheetOpen(true);
  };

  const closeCard = () => {
    setIsSheetOpen(false);
    setSelectedPlace(null);
  };

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
        const map = new kakao.maps.Map(mapRef.current, { center, level });

        const clusterer = new kakao.maps.MarkerClusterer({
          map: map, // 마커들이 클러스터링 될 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 3, // 클러스터 할 최소 지도 레벨
          gridSize: 10,
          styles: [
            {
              width: '45px',
              height: '45px',
              background: '#8BE34A',
              borderRadius: '50%',
              color: '#354052',
              textAlign: 'center',
              lineHeight: '40px',
              fontWeight: 'bold',
              boxShadow: '0 0 0 10px rgba(139,227,74,0.55)',
            },
          ],
        });

        const markerImage = new kakao.maps.MarkerImage(
          pinImage,
          new kakao.maps.Size(35, 55),
          { offset: new kakao.maps.Point(12, 24) },
        );
        clusterer.clear();

        if (places && places.length > 0) {
          // 위도, 경도가 있는 데이터만 필터링
          const markers = places
            .filter(
              (place) => place.latitude != null && place.longitude != null,
            )
            .map((place) => {
              const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(
                  place.latitude,
                  place.longitude,
                ),
                image: markerImage,
              });

              kakao.maps.event.addListener(marker, 'click', () => {
                openCard(place);
              });

              return marker;
            });

          clusterer.addMarkers(markers);

          kakao.maps.event.addListener(map, 'click', () => {
            closeCard();
          });
        }
      })
      .catch((err) => console.error('카카오맵 로드 실패', err));
  }, [lat, lng, level, places]);

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />

      {selectedPlace && (
        <PartnershipPlaceCard isSheetOpen={isSheetOpen} place={selectedPlace} />
      )}
      <div
        onClick={() => navigate('/explore?category=전체')}
        className="fixed left-1/2 z-50 -translate-x-1/2"
        style={{
          bottom: selectedPlace && isSheetOpen ? 180 : 30,
        }}
      >
        <MapNavigateButton />
      </div>
    </>
  );
}
