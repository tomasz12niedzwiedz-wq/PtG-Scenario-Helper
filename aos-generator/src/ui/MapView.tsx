import type { MapScenario } from "../engine/types";

export default function MapView({ map }: { map: MapScenario }) {
  return (
    <div className="map-container">
      <img src={map.image} className="map-image" />

      {map.objectives.map((obj) => (
        <div
          key={obj.id}
          className="objective"
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
          }}
        />
      ))}
    </div>
  );
}