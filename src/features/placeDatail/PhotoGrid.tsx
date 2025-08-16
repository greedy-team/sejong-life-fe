import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 50rem;
  max-height: 40rem;
  overflow-y: auto;
  padding: 0.1rem;
  gap: 0.1rem;
  background: var(--background-color);
`;

const GridImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  cursor: pointer;
`;

interface PhotoGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ images, onImageClick }) => {
  return (
    <GridContainer>
      {images.map((src, i) => (
        <GridImage key={i} src={src} onClick={() => onImageClick(i)} />
      ))}
    </GridContainer>
  );
};

export default PhotoGrid;
