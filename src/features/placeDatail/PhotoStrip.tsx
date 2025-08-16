import styled from 'styled-components';
import { useState } from 'react';
import LightboxViewer from './LightboxViewer';
import PhotoGrid from './PhotoGrid';

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
  font-size: 3rem;
  font-weight: bold;
  color: #000000;
  cursor: pointer;

  &:hover {
    background: #e5e5e5;
  }
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  position: relative;
  max-width: 70%;
  max-height: 70%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const CloseButton = styled.button`
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
`;

interface PhotoStripProps {
  images: string[];
}

const PhotoStrip: React.FC<PhotoStripProps> = ({ images }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <>
      <PhotoStripContainer>
        {images.slice(0, 3).map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`place-${i}`}
            onClick={() => {
              setIndex(i);
              setIsLightboxOpen(true);
            }}
          />
        ))}
        <MoreImageButton onClick={() => setIsGridOpen(true)}>+</MoreImageButton>
      </PhotoStripContainer>

      {isGridOpen && (
        <Backdrop onClick={() => setIsGridOpen(false)}>
          <Modal>
            <ModalHeader>
              <CloseButton onClick={() => setIsGridOpen(false)}>✕</CloseButton>
            </ModalHeader>
            <PhotoGrid
              images={images}
              onImageClick={(i) => {
                setIndex(i);
                setIsLightboxOpen(true);
              }}
            />
          </Modal>
        </Backdrop>
      )}

      <LightboxViewer
        isLightboxOpen={isLightboxOpen}
        index={index}
        images={images}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
};

export default PhotoStrip;
