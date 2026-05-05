import Card from "./Card";

export default function PlayerCard({ player }: any) {
  return (
    <Card>
      <h3>{player.name}</h3>
      <p>{player.faction}</p>
      <p>🔥 {player.emberstone}</p>
      <p>Wins: {player.wins} / Losses: {player.loses}</p>

      {player.isUnderdog && (
        <div className="underdog-badge">UNDERDOG</div>
      )}
    </Card>
  );
}