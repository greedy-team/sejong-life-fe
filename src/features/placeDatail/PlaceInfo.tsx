import styled from 'styled-components';
import type { PlaceDetail } from './PlaceDetailContainer';

const PlaceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  width: 90%;
`;

const NameAndCategorySection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .category {
    padding: 0.4rem 0.8rem 0 0.8rem;
    font-size: 1rem;
    border-radius: var(--border-radius-button);
    background: #f0f0f0;
  }
`;

const TagsSection = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  .tagList {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .tag {
    padding: 0.3rem 0.6rem;
    font-size: 0.875rem;
    border-radius: var(--border-radius-button);
    background-color: #f8a7a7;
    color: #333;
    font-weight: normal;
  }
`;

const MapLinksSection = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;

  .mapLinksWrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    width: 100%;
    gap: 2rem;
  }

  .mapLinkButton {
    flex: 1;
    text-align: center;
    padding: 0.3rem 0;
    font-size: 1.2rem;
    border-radius: var(--border-radius-button);

    &.naver {
      background-color: #02c158;
    }

    &.kakao {
      background-color: #f6df03;
    }

    &.google {
      background-color: #c3c8c3;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

interface PlaceInfoProps {
  place: PlaceDetail;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ place }) => {
  return (
    <PlaceInfoContainer>
      <NameAndCategorySection>
        <h1>{place.placeName}</h1>
        <div className="category">카페</div>
      </NameAndCategorySection>

      <TagsSection>
        🏷️ 태그
        <div className="tagList">
          {place.tags.map((tag) => (
            <span className="tag" key={tag.tagId}>
              #{tag.tagName}
            </span>
          ))}
        </div>
      </TagsSection>

      <MapLinksSection>
        📍 지도 바로가기
        <div className="mapLinksWrapper">
          <a
            href={place.mapLinks.naverMap}
            target="_blank"
            className="mapLinkButton naver"
          >
            네이버맵
          </a>
          <a
            href={place.mapLinks.kakaoMap}
            target="_blank"
            className="mapLinkButton kakao"
          >
            카카오맵
          </a>
          <a
            href={place.mapLinks.googleMap}
            target="_blank"
            className="mapLinkButton google"
          >
            구글맵
          </a>
        </div>
      </MapLinksSection>
    </PlaceInfoContainer>
  );
};

export default PlaceInfo;
