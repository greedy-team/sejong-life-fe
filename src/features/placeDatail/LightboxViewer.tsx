import { createGlobalStyle } from 'styled-components';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface LightboxViewerProps {
  isOpen: boolean;
  index: number;
  images: string[];
  onClose: () => void;
}

const LightboxStyles = createGlobalStyle`
    .yarl__container {
        background: rgba(0, 0, 0, 0.8);
    }
`;

const LightboxViewer: React.FC<LightboxViewerProps> = ({
  isOpen,
  index,
  images,
  onClose,
}) => {
  return (
    <>
      <LightboxStyles />
      <Lightbox
        open={isOpen}
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
