import Card from "./Card";

export default function MapCard({ map }: any) {
  return (
    <Card>
      <h2>🗺️ {map.name}</h2>
      <div className="map-frame">
        <img src={map.image} />
      </div>
      <p>{map.description}</p>
    </Card>
  );
}