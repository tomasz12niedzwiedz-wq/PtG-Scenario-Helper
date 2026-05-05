import Card from "./Card";

export default function MapCard({ map }: any) {
  return (
    <Card>
      <h2>🗺️ {map.name}</h2>
      <div className="map-frame">
        <img src={map.image} />
      </div>
      <p>{map.description}</p>
      <p><strong>Objectives:</strong> {map.objectives}</p>
      <p><strong>Deployment:</strong> {map.deployment}</p>
      <p><strong>Win Condition:</strong> {map.winCondition}</p>
      <p><strong>Emberstone shards:</strong> {map.emberstoneNodes}</p>
    </Card>
  );
}