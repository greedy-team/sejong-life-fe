import { useState } from 'react';
import LightboxViewer from './LightboxViewer';
import PhotoGrid from './PhotoGrid';

interface PhotoStripProps {
  images: string[];
}

const PhotoStrip = ({ images }: PhotoStripProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const haveImages = images && images.length > 0;

  const handleMoreImageButtonClick = () => {
    if (haveImages) {
      setIsGridOpen(true);
    } else {
      alert('사진이 없습니다.');
    }
  };

  const handledError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.alt = '사진을 불러오는 데 실패했습니다.';
  };

  return (
    <>
      <div className="relative mx-auto mt-2 flex h-[18rem] min-h-[120px] w-[90%] cursor-pointer overflow-hidden rounded-2xl bg-[#d9d9d9]">
        {[0, 1, 2].map((i) =>
          images[i] ? (
            <img
              className="h-full w-1/4 flex-1 object-cover"
              key={i}
              src={images[i]}
              alt={`place-${i}`}
              onClick={() => {
                setIndex(i);
                setIsLightboxOpen(true);
              }}
              onError={handledError}
            />
          ) : (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0',
              }}
            >
              📷 사진이 없습니다
            </div>
          ),
        )}
        {haveImages && (
          <button
            className="absolute top-4 right-4 flex h-15 w-15 items-center justify-center rounded-full border border-white/50 bg-white/90 text-3xl font-bold shadow-sm"
            onClick={() => handleMoreImageButtonClick()}
          >
            +
          </button>
        )}
      </div>

      {isGridOpen && haveImages && (
        <div
          className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/80"
          onClick={() => setIsGridOpen(false)}
        >
          <div
            className="relative max-h-[70%] max-w-[70%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-end">
              <button
                className="cursor-pointer text-2xl font-bold text-white"
                onClick={() => setIsGridOpen(false)}
              >
                ✕
              </button>
            </div>
            <PhotoGrid
              images={images}
              onImageClick={(i) => {
                setIndex(i);
                setIsLightboxOpen(true);
              }}
            />
          </div>
        </div>
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
