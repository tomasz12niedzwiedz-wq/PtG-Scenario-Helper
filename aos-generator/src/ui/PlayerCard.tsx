export default function PlayerCard({ player, onUpdate }: any) {
  const addStone = () => {
    onUpdate({
      ...player,
      emberstone: player.emberstone + 1,
    });
  };

  const removeStone = () => {
    onUpdate({
      ...player,
      emberstone: Math.max(0, player.emberstone - 1),
    });
  };

  return (
    <div className={`player-card ${player.isUnderdog ? "underdog" : ""}`}>
      <h3>{player.name}</h3>
      <p>{player.faction}</p>

      <div className="ember-controls">
        <button onClick={removeStone}>−</button>
        <span className="ember-count">🔥 {player.emberstone}</span>
        <button onClick={addStone}>+</button>
      </div>

      <div className="stats">
        <span>W: {player.wins} </span>
        <span>L: {player.loses}</span>
      </div>
    </div>
  );
}
