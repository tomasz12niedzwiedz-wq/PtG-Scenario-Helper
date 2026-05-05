import { useState } from "react";
import { generateScenario } from "./engine/generator";
import MapCard from "./ui/MapCard";
import TwistCard from "./ui/TwistCard";
import PlayerCard from "./ui/PlayerCard";
import TwistSelection from "./ui/TwistSelection";
// import { playRoll } from "./engine/sound";

export default function App() {
  const [players, setPlayers] = useState<any[]>([
    {
      id: "1",
      name: "Gracz 1",
      faction: "Stormcast Eternals",
      emberstone: 0,
      wins: 0,
      loses: 0,
    },
  ]);

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

  const handleTwistSelect = (twist: any) => {
    setSelectedTwist(twist);
  };

  const generate = () => {
    // playRoll();

    const g = generateScenario(players);

    setGame(g);
    setTwistOptions(g.twistOptions);
    setSelectedTwist(null);
  };

  return (
    <div className="tabletop">
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

      <button className="main-btn" onClick={generate}>
        🎲 GENERATE BATTLE
      </button>

      {/* Twist selection */}
      {game && twistOptions.length > 0 && !selectedTwist && (
        <div>
          <h2>Twist</h2>
          <TwistSelection
            options={twistOptions}
            onSelect={handleTwistSelect}
          />
        </div>
      )}

      {/* ⚔️ FINALNY WIDOK GRY */}
      {game && selectedTwist && (
        <div className="board">
          <MapCard map={game.map} />
          <TwistCard twist={selectedTwist} />

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