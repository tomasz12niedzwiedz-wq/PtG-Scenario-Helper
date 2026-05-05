import { useState } from "react";
import { generateScenario } from "./engine/generator";
import MapCard from "./ui/MapCard";
import TwistCard from "./ui/TwistCard";
import PlayerCard from "./ui/PlayerCard";
import TwistSelection from "./ui/TwistSelection";
// import { playRoll } from "./engine/sound";

export default function App() {
  const [players] = useState<any[]>([
    {
      id: "1",
      name: "Gracz 1",
      faction: "Stormcast Eternals",
      emberstone: 0,
      wins: 0,
    },
    {
      id: "2",
      name: "Gracz 2",
      faction: "Skaven",
      emberstone: 0,
      wins: 0,
    },
  ]);

  const [game, setGame] = useState<any>(null);
  const [twistOptions, setTwistOptions] = useState<any[]>([]);
  const [selectedTwist, setSelectedTwist] = useState<any>(null);

  const generate = () => {
    // playRoll();

    const g = generateScenario(players);

    setGame(g);
    setTwistOptions(g.twistOptions); // 👈 teraz pochodzi z generatora
    setSelectedTwist(null);
  };

  const handleTwistSelect = (twist: any) => {
    setSelectedTwist(twist);
  };

  return (
    <div className="tabletop">
      <button className="main-btn" onClick={generate}>
        🎲 GENERATE BATTLE
      </button>

      {/* 🔮 WYBÓR TWISTU */}
      {game && twistOptions.length > 0 && !selectedTwist && (
        <div>
          <h2>Underdog wybiera Twist</h2>
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