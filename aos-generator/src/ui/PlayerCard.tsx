import { motion } from "framer-motion";

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

        <motion.span
          key={player.emberstone}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="ember-count"
        >
          🔥 {player.emberstone}
        </motion.span>

        <button onClick={addStone}>+</button>
      </div>
    </div>
  );
}
