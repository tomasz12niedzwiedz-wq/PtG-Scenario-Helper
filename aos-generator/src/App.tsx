import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { generateScenario } from "./engine/generator";
import MapCard from "./ui/MapCard";
import TwistCard from "./ui/TwistCard";
import PlayerCard from "./ui/PlayerCard";

const STORAGE_KEY = "aos-generator-players";

type RegionKey = "scorched" | "gnaw" | "hateful" | "hel";

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

  const [game, setGame] = useState<any>(null);
  const [twistOptions, setTwistOptions] = useState<any[]>([]);
  const [selectedTwist, setSelectedTwist] = useState<any>(null);

  const [showPlayerManager, setShowPlayerManager] = useState(false);

  const [playerForm, setPlayerForm] = useState<any>({
    id: "",
    name: "",
    faction: "",
    emberstone: 0,
    wins: 0,
    loses: 0,
  });

  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  const [regions, setRegions] = useState<Record<RegionKey, boolean>>({
    scorched: true,
    gnaw: true,
    hateful: true,
    hel: true,
  });

  const toggleRegion = (key: RegionKey) => {
    setRegions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const handlePlayerFormChange = (field: string, value: string) => {
    setPlayerForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSavePlayer = () => {
    if (!playerForm.name.trim() || !playerForm.faction.trim()) return;

    if (editingPlayerId) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === editingPlayerId ? { ...playerForm, id: editingPlayerId } : p,
        ),
      );
    } else {
      setPlayers((prev) => [
        ...prev,
        { ...playerForm, id: crypto.randomUUID() },
      ]);
    }

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

  const handleEditPlayer = (player: any) => {
    setPlayerForm(player);
    setEditingPlayerId(player.id);
  };

  const generate = () => {
    const selected = Object.entries(regions)
      .filter(([_, v]) => v)
      .map(([k]) => k);

    const g = generateScenario(players, selected);

    setGame(g);
    setTwistOptions(g.twistOptions);
    // Jeśli jest tylko jedna opcja, wybierz ją automatycznie, w przeciwnym razie pokaż tabelę
    setSelectedTwist(g.twistOptions.length === 1 ? g.twistOptions[0] : null);
    setWinnerId(null);
  };

  return (
    <div className="tabletop">
      {/* ☰ MENU */}
      <button
        className="hamburger-btn"
        onClick={() => setShowPlayerManager(true)}
      >
        ☰ Players
      </button>

      {/* 🧾 MODAL */}
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

            <div className="players-list-admin">
              {players.map((p) => (
                <div key={p.id} className="player-admin-row">
                  <span>
                    {p.name} ({p.faction})
                  </span>
                  <button onClick={() => handleEditPlayer(p)}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REGION SELECTOR - Klikalny cały Label */}
      <div className="region-selector">
        {[
          { key: "scorched", label: "Scorched Outskirts" },
          { key: "gnaw", label: "Gnaw’s Edge" },
          { key: "hateful", label: "Hateful Shores" },
          { key: "hel", label: "Hel’s Claw" },
        ].map((r) => {
          const active = regions[r.key as RegionKey];

          return (
            <motion.label
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              layout
              key={r.key}
              className={`region-card ${active ? "active" : ""}`}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggleRegion(r.key as RegionKey)}
                style={{ cursor: "pointer" }}
              />
              {r.label}
            </motion.label>
          );
        })}
      </div>

      <button className="main-btn" onClick={generate}>
        🎲 GENERATE BATTLE
      </button>

      {game && (
        <motion.div
          key={game.id}
          className="board"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <MapCard map={game.map} />

          {/* TWIST SECTION */}
          <div className="twist-section" style={{ margin: "20px 0" }}>
            {selectedTwist ? (
              <div className="selected-twist-container">
                <button
                  className="reset-twist-btn"
                  onClick={() => setSelectedTwist(null)}
                  style={{
                    marginBottom: "10px",
                    padding: "5px 15px",
                    cursor: "pointer",
                  }}
                >
                  ↩ Change Twist / Show Table
                </button>
                <TwistCard twist={selectedTwist} />
              </div>
            ) : (
              twistOptions.length > 0 && (
                <div className="twist-table">
                  <h3>Select Twist (Roll Dice)</h3>
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
                        <tr
                          key={index}
                          onClick={() => setSelectedTwist(twist)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{twist.diceRoll}</td>
                          <td style={{ fontWeight: "bold" }}>{twist.name}</td>
                          <td>{twist.effect}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>

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
