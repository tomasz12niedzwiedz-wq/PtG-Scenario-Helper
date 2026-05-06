import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { generateScenario } from "./engine/generator";
import MapCard from "./ui/MapCard";
import TwistCard from "./ui/TwistCard";
import PlayerCard from "./ui/PlayerCard";
// import { playRoll } from "./engine/sound";

const STORAGE_KEY = "aos-generator-players";

const defaultPlayers = [
  {
    id: "1",
    name: "Gracz 1",
    faction: "Stormcast Eternals",
    emberstone: 0,
    wins: 0,
    loses: 0,
  },
];

const loadPlayersFromStorage = () => {
  if (typeof window === "undefined") return defaultPlayers;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultPlayers;

  try {
    return JSON.parse(stored);
  } catch {
    return defaultPlayers;
  }
};

export default function App() {
  const [players, setPlayers] = useState<any[]>(loadPlayersFromStorage);

  const [winnerId, setWinnerId] = useState<string | null>(null);

  const [playerForm, setPlayerForm] = useState<any>({
    id: "",
    name: "",
    faction: "",
    emberstone: 0,
    wins: 0,
    loses: 0,
  });

  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  const [game, setGame] = useState<any>(null);
  const [twistOptions, setTwistOptions] = useState<any[]>([]);
  const [selectedTwist, setSelectedTwist] = useState<any>(null);
  const [showPlayerManager, setShowPlayerManager] = useState(false);

  const resetPlayerForm = () => {
    setPlayerForm({
      id: "",
      name: "",
      faction: "",
      emberstone: 0,
      wins: 0,
      loses: 0,
    });
    setEditingPlayerId(null);
  };

  const handlePlayerFormChange = (field: string, value: string | number) => {
    setPlayerForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSavePlayer = () => {
    if (!playerForm.name.trim() || !playerForm.faction.trim()) return;

    if (editingPlayerId) {
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === editingPlayerId
            ? { ...playerForm, id: editingPlayerId }
            : player,
        ),
      );
    } else {
      setPlayers((prev) => [
        ...prev,
        {
          ...playerForm,
          id: crypto.randomUUID(),
        },
      ]);
    }

    resetPlayerForm();
  };

  const handleEditPlayer = (player: any) => {
    setPlayerForm(player);
    setEditingPlayerId(player.id);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const generate = () => {
    const g = generateScenario(players);

    setGame(g);
    setTwistOptions(g.twistOptions);
    setSelectedTwist(g.twistOptions.length === 1 ? g.twistOptions[0] : null);
    setWinnerId(null); // 🔥 reset winner przy nowej grze
  };

  const endBattle = (playerId: string) => {
    setWinnerId(playerId);

    const updatedPlayers = game.players.map((p: any) => {
      if (p.id === playerId) {
        return {
          ...p,
          emberstone: p.emberstone + game.emberstoneAwarded,
          wins: p.wins + 1,
        };
      }
      return {
        ...p,
        loses: (p.loses || 0) + 1,
      };
    });

    setGame((prev: any) => ({
      ...prev,
      players: updatedPlayers,
    }));

    setPlayers(updatedPlayers); // 🔥 zapis do globalnego stanu
  };

  return (
    <div className="tabletop">
      <button
        className="hamburger-btn"
        onClick={() => setShowPlayerManager(true)}
      >
        ☰ Players
      </button>

      {showPlayerManager && (
        <div className="player-manager-modal">
          <div
            className="modal-overlay"
            onClick={() => setShowPlayerManager(false)}
          />
          <div className="player-manager-window">
            <button
              className="close-btn"
              onClick={() => setShowPlayerManager(false)}
            >
              ×
            </button>

            <h2>Manage Players</h2>

            <input
              placeholder="Name"
              value={playerForm.name}
              onChange={(e) => handlePlayerFormChange("name", e.target.value)}
            />

            <input
              placeholder="Faction"
              value={playerForm.faction}
              onChange={(e) =>
                handlePlayerFormChange("faction", e.target.value)
              }
            />

            <button onClick={handleSavePlayer}>
              {editingPlayerId ? "Save" : "Add"}
            </button>

            {players.map((p) => (
              <div key={p.id}>
                {p.name} ({p.faction})
                <button onClick={() => handleEditPlayer(p)}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="main-btn" onClick={generate}>
        🎲 GENERATE BATTLE
      </button>

      {game && (
        <motion.div
          className="board"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MapCard map={game.map} />

          {selectedTwist && <TwistCard twist={selectedTwist} />}

          {!selectedTwist && twistOptions.length > 0 && (
            <motion.div
              key={`table-${game.id}`}
              className="twist-table"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <table>
                <thead>
                  <tr>
                    <th>Dice Roll</th>
                    <th>Name</th>
                    <th>Effect</th>
                  </tr>
                </thead>

                <tbody>
                  {twistOptions.map((twist: any, index: number) => (
                    <motion.tr
                      key={twist.id ?? index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedTwist(twist)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{twist.diceRoll}</td>
                      <td>{twist.name}</td>
                      <td>{twist.effect}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {selectedTwist && !winnerId && (
            <div className="end-screen">
              <h2>🏁 Who won?</h2>
              {game.players.map((p: any) => (
                <button key={p.id} onClick={() => endBattle(p.id)}>
                  {p.name}
                </button>
              ))}
            </div>
          )}

          {winnerId && (
            <h2 className="winner">
              🏆 Winner:{" "}
              {game.players.find((p: any) => p.id === winnerId)?.name}
            </h2>
          )}

          <div className="players-row">
            {players.map((p: any) => (
              <PlayerCard
                key={p.id}
                player={p}
                onUpdate={(updated: any) => {
                  setPlayers((prev) =>
                    prev.map((pl) => (pl.id === updated.id ? updated : pl)),
                  );
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
