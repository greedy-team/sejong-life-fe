import styled from 'styled-components';

const PhotoStripContainer = styled.div`
  display: flex;
  border-radius: var(--border-radius);
  margin: 2rem auto;
  width: 90%;
  height: 30%;
  background: #d9d9d9;
  cursor: pointer;
  overflow: hidden;
`;

const Image = styled.img`
  flex: 1;
  width: 25%;
  height: 100%;
  object-fit: cover;
`;

const MoreImageButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #000000;
  cursor: pointer;

  &:hover {
    background: #e5e5e5;
  }
`;

interface PhotoStripProps {
  images: string[];
}

const PhotoStrip: React.FC<PhotoStripProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <PhotoStripContainer>
      {images.slice(0, 3).map((src, i) => (
        <Image key={i} src={src} alt={`place-${i}`} />
      ))}
      <MoreImageButton>+</MoreImageButton>
    </PhotoStripContainer>
  );
};

export default PhotoStrip;
