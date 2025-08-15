import styled from 'styled-components';

const PhotoStripContainer = styled.div`
  display: flex;
  border-radius: var(--border-radius);
  margin: 2rem auto;
  width: 90%;
  height: 30%;
  cursor: pointer;
  background: #95f2d7;
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
  color: #555;
`;

const PhotoStrip = () => {
  const images = [
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
  ];

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
