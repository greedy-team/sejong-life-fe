interface PlaceItemCardProps {
  placeName: string;
}

const PlaceItemCard = ({ placeName }: PlaceItemCardProps) => {
  return (
    <div className="w-[430px] h-[235px] rounded-lg border">
      <h3>{placeName}</h3>
      <p>카페</p>
      <div>태그들</div>
    </div>
  );
};

export default PlaceItemCard;
