import type { MapScenario } from "../engine/types";

export default function MapView({ map }: { map: MapScenario }) {
  return (
    <div className="map-container">
      <img src={map.image} className="map-image" />
    </div>
  );
}