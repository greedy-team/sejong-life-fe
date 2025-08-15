import styled from 'styled-components';
import PhotoStrip from './PhotoStrip';
import PlaceInfo from './PlaceInfo';

const Base = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8rem auto;
  width: 62.5rem;
  height: 50rem;
  background: var(--background-color);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
`;

const PlaceDetailContainer = () => {
  return (
    <>
      <Base>
        <PhotoStrip></PhotoStrip>
        <PlaceInfo></PlaceInfo>
      </Base>
    </>
  );
};

export default PlaceDetailContainer;
