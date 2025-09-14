interface PhotoGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

const PhotoGrid = ({ images, onImageClick }: PhotoGridProps) => {
  return (
    <div className="grid max-h-[40rem] grid-cols-3 gap-0.5 overflow-y-auto bg-white p-0.5">
      {images.map((src, i) => (
        <img
          className="aspect-square w-full cursor-pointer object-cover"
          key={i}
          src={src}
          onClick={() => onImageClick(i)}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
