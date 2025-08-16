import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface LightboxViewerProps {
  isOpen: boolean;
  index: number;
  images: string[];
  onClose: () => void;
}

const LightboxViewer: React.FC<LightboxViewerProps> = ({
  isOpen,
  index,
  images,
  onClose,
}) => {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={index}
      slides={images.map((src) => ({ src }))}
      carousel={{ finite: true }}
    />
  );
};

export default LightboxViewer;
