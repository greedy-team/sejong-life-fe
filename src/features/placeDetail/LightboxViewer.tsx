import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

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
      <Lightbox
        open={isLightboxOpen}
        close={onClose}
        index={index}
        slides={images.map((src) => ({ src }))}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      />
    </>
  );
};

export default LightboxViewer;
