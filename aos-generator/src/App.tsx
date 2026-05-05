import { useEffect, useState } from "react";
import { generateScenario } from "./engine/generator";
import MapCard from "./ui/MapCard";
import TwistCard from "./ui/TwistCard";
import PlayerCard from "./ui/PlayerCard";
// import { playRoll } from "./engine/sound";

const STORAGE_KEY = "aos-generator-players";

const loadPlayersFromStorage = () => {
  if (typeof window === "undefined") return [
    {
      id: "1",
      name: "Gracz 1",
      faction: "Stormcast Eternals",
      emberstone: 0,
      wins: 0,
      loses: 0,
    },
  ];

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [
      {
        id: "1",
        name: "Gracz 1",
        faction: "Stormcast Eternals",
        emberstone: 0,
        wins: 0,
        loses: 0,
      },
    ];
  }

  try {
    return JSON.parse(stored);
  } catch {
    return [
      {
        id: "1",
        name: "Gracz 1",
        faction: "Stormcast Eternals",
        emberstone: 0,
        wins: 0,
        loses: 0,
      },
    ];
  }
};

export default function App() {
  const [players, setPlayers] = useState<any[]>(loadPlayersFromStorage);

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
    if (!playerForm.name.trim() || !playerForm.faction.trim()) {
      return;
    }

    if (editingPlayerId) {
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === editingPlayerId ? { ...playerForm, id: editingPlayerId } : player
        )
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
    // playRoll();

    const g = generateScenario(players);

    setGame(g);
    setTwistOptions(g.twistOptions);
    if (g.twistOptions.length === 1) {
      setSelectedTwist(g.twistOptions[0]);
    } else {
      setSelectedTwist(null);
    }
  };

  return (
    <div className="tabletop">
      <button className="hamburger-btn" type="button" onClick={() => setShowPlayerManager(true)}>
        ☰ Players
      </button>

      {showPlayerManager && (
        <div className="player-manager-modal">
          <div className="modal-overlay" onClick={() => setShowPlayerManager(false)} />
          <div className="player-manager-window">
            <button className="close-btn" type="button" onClick={() => setShowPlayerManager(false)}>
              ×
            </button>
            <div className="player-manager">
              <h2>Manage Players</h2>
              <div className="player-form">
                <label>
                  Name
                  <input
                    value={playerForm.name}
                    onChange={(e) => handlePlayerFormChange("name", e.target.value)}
                    placeholder="Player name"
                  />
                </label>
                <label>
                  Faction
                  <input
                    value={playerForm.faction}
                    onChange={(e) => handlePlayerFormChange("faction", e.target.value)}
                    placeholder="Faction"
                  />
                </label>
                <label>
                  Emberstone
                  <input
                    type="number"
                    value={playerForm.emberstone}
                    onChange={(e) => handlePlayerFormChange("emberstone", Number(e.target.value))}
                  />
                </label>
                <label>
                  Wins
                  <input
                    type="number"
                    value={playerForm.wins}
                    onChange={(e) => handlePlayerFormChange("wins", Number(e.target.value))}
                  />
                </label>
                <label>
                  Losses
                  <input
                    type="number"
                    value={playerForm.loses}
                    onChange={(e) => handlePlayerFormChange("loses", Number(e.target.value))}
                  />
                </label>
                <div className="form-actions">
                  <button className="main-btn" type="button" onClick={handleSavePlayer}>
                    {editingPlayerId ? "Save Player" : "Add Player"}
                  </button>
                  {editingPlayerId && (
                    <button className="main-btn cancel" type="button" onClick={resetPlayerForm}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <div className="player-list">
                {players.map((player) => (
                  <div key={player.id} className="player-list-item">
                    <div>
                      <strong>{player.name}</strong> — {player.faction}
                    </div>
                    <button className="main-btn small" type="button" onClick={() => handleEditPlayer(player)}>
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <button className="main-btn" onClick={generate}>
        🎲 GENERATE BATTLE
      </button>

      {/* ⚔️ FINALNY WIDOK GRY */}
      {game && (
        <div className="board">
          <MapCard map={game.map} />
          {twistOptions.length === 1 ? (
            <TwistCard twist={selectedTwist} />
          ) : (
            <div className="twist-table">
              <h2>Twists</h2>
              <table>
                <thead>
                  <tr>
                    <th>Dice Roll</th>
                    <th>Name</th>
                    <th>Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {twistOptions.map((twist, index) => (
                    <tr key={index}>
                      <td>{twist.diceRoll}</td>
                      <td>{twist.name}</td>
                      <td>{twist.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="players-row">
            {game.players.map((p: any) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}