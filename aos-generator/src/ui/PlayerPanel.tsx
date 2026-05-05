import type { Player } from "../engine/types";

export default function PlayerPanel({ players }: { players: Player[], upgrades?: string[]; }) {
  return (
    <div className="players">
      {players.map((p) => (
        <div
          key={p.id}
          className={`player ${p.isUnderdog ? "underdog" : ""}`}
        >
          <h3>{p.name}</h3>
          <p>{String(p.faction)}</p>
          <p>🔥 Emberstone: {p.emberstone}</p>
          {p.isUnderdog && <span>UNDERDOG</span>}
        </div>
      ))}
    </div>
  );
}