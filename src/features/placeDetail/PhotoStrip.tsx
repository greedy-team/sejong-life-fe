import { useState, useEffect } from 'react';
import LightboxViewer from './LightboxViewer';
import PhotoGrid from './PhotoGrid';

interface PhotoStripProps {
  images: string[];
}

const PhotoStrip = ({ images }: PhotoStripProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); //sm기준
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxCount = isMobile ? 2 : 3;
  const haveImages = images && images.length > maxCount;

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
      <div className="relative mx-auto mt-2 flex h-[15rem] min-h-[120px] w-[90%] cursor-pointer overflow-hidden rounded-2xl bg-[#d9d9d9]">
        {Array.from({ length: maxCount }).map((_, i) =>
          images[i] ? (
            <div
              key={i}
              className="h-full overflow-hidden"
              style={{ flex: `0 0 calc(${100 / maxCount}%)` }}
            >
              <img
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                key={i}
                src={images[i]}
                alt={`place-${i}`}
                onClick={() => {
                  setIndex(i);
                  setIsLightboxOpen(true);
                }}
                onError={handledError}
              />
            </div>
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
              <div className="flex items-center gap-2">
                <img
                  src="/asset/place-detail-page/camera.svg"
                  alt="camera"
                  className="text-[#77db30]"
                />
                <span className="text-[#354052]">사진이 없습니다</span>
              </div>
            </div>
          ),
        )}
        {haveImages && (
          <button
            className="absolute top-4 right-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-white/90 text-3xl font-bold shadow-sm"
            onClick={() => handleMoreImageButtonClick()}
          >
            <img src="/asset/place-detail-page/plus.svg" alt="더보기" />
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
                <img src="/asset/place-detail-page/x.svg" alt="닫기" />
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
        setIndex={setIndex}
      />
    </>
  );
};

export default PhotoStrip;
