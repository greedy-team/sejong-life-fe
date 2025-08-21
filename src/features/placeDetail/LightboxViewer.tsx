import { createGlobalStyle } from 'styled-components';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const LightboxStyles = createGlobalStyle`
    .yarl__container {
        background: rgba(0, 0, 0, 0.8);
    }
`;

interface LightboxViewerProps {
  isLightboxOpen: boolean;
  index: number;
  images: string[];
  onClose: () => void;
}

const LightboxViewer = ({
  isLightboxOpen,
  index,
  images,
  onClose,
}: LightboxViewerProps) => {
  return (
    <>
      <LightboxStyles />
      <Lightbox
        open={isLightboxOpen}
        close={onClose}
        index={index}
        slides={images.map((src) => ({ src }))}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
};

export default LightboxViewer;
