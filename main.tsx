// AOS Scenario Generator
// Stack: React + TypeScript (Vite compatible single-file example)
// Styling: Tailwind
// Ready for Netlify deployment

import { useState } from "react";

// ===================== TYPES =====================
type Player = {
  id: string;
  name: string;
  emberstoneShards: number;
};

type TwistEffect = {
  roll: number;
  name: string;
  description: string;
};

type TwistTable = {
  name: string;
  effects: TwistEffect[];
};

type Battleplan = {
  name: string;
  description: string;
};

// ===================== DATA =====================
const TWISTS: TwistTable[] = [
  {
    name: "Ash Storm",
    effects: [
      { roll: 1, name: "Cinder Squall", description: "No shooting >12\"" },
      { roll: 2, name: "Cinder Squall", description: "No shooting >12\"" },
      { roll: 3, name: "Claggy Sands", description: "-2 to run" },
      { roll: 4, name: "Claggy Sands", description: "-2 to run" },
      { roll: 5, name: "Soot Rain", description: "Mortal dmg on retreat" },
      { roll: 6, name: "Emberstone Surge", description: "+1 cluster" }
    ]
  }
];

const BATTLEPLANS: Battleplan[] = [
  { name: "Rift in the Peaks", description: "Control shifting objectives" },
  { name: "Rise Through the Ashes", description: "Climb and survive" },
  { name: "Raid on Hel's Claw", description: "Strike enemy stronghold" }
];

// ===================== HELPERS =====================
const roll = (max: number) => Math.floor(Math.random() * max) + 1;

function getTwist() {
  const table = TWISTS[Math.floor(Math.random() * TWISTS.length)];
  const dice = roll(6);
  const effect = table.effects.find(e => e.roll === dice)!;
  return { table: table.name, dice, effect };
}

function getBattleplan() {
  return BATTLEPLANS[Math.floor(Math.random() * BATTLEPLANS.length)];
}

function getEmberstone() {
  return roll(3) + 1;
}

function getUnderdog(players: Player[]) {
  return players.reduce((a, b) =>
    a.emberstoneShards <= b.emberstoneShards ? a : b
  );
}

// ===================== UI =====================
export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState("");
  const [shards, setShards] = useState(0);
  const [scenario, setScenario] = useState<any>(null);

  const addPlayer = () => {
    if (!name) return;
    setPlayers([...players, { id: crypto.randomUUID(), name, emberstoneShards: shards }]);
    setName("");
    setShards(0);
  };

  const generate = () => {
    if (players.length < 2) return alert("Add at least 2 players");

    const twist = getTwist();
    const battleplan = getBattleplan();
    const emberstone = getEmberstone();
    const underdog = getUnderdog(players);

    // SOUND (simple Google TTS)
    const msg = new SpeechSynthesisUtterance("Scenario generated");
    speechSynthesis.speak(msg);

    setScenario({ twist, battleplan, emberstone, underdog });
  };

  return (
    <div className="min-h-screen bg-black text-amber-200 p-6 font-serif">
      <h1 className="text-4xl mb-6 text-center">⚔️ AOS Scenario Generator ⚔️</h1>

      <div className="bg-gray-900 p-4 rounded-2xl shadow-xl mb-6">
        <h2 className="text-xl mb-2">Players</h2>
        <div className="flex gap-2 mb-2">
          <input
            className="p-2 bg-black border border-amber-500"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="number"
            className="p-2 bg-black border border-amber-500 w-24"
            value={shards}
            onChange={e => setShards(Number(e.target.value))}
          />
          <button onClick={addPlayer} className="bg-amber-600 px-3 rounded">Add</button>
        </div>

        {players.map(p => (
          <div key={p.id}>
            {p.name} ({p.emberstoneShards})
          </div>
        ))}
      </div>

      <button
        onClick={generate}
        className="bg-red-700 px-6 py-3 rounded-2xl text-xl hover:bg-red-900 w-full"
      >
        Generate Scenario
      </button>

      {scenario && (
        <div className="mt-6 bg-gray-900 p-4 rounded-2xl">
          <h2 className="text-2xl mb-2">Result</h2>

          <p><b>Battleplan:</b> {scenario.battleplan.name}</p>
          <p><b>Emberstone Clusters:</b> {scenario.emberstone}</p>

          <p className="mt-2"><b>Twist:</b> {scenario.twist.table}</p>
          <p>{scenario.twist.effect.name} - {scenario.twist.effect.description}</p>

          <p className="mt-2 text-red-400">
            <b>Underdog:</b> {scenario.underdog.name}
          </p>
        </div>
      )}
    </div>
  );
}

// ===================== NETLIFY =====================
// 1. npm create vite@latest aos-gen -- --template react-ts
// 2. npm install && npm install -D tailwindcss postcss autoprefixer
// 3. npx tailwindcss init -p
// 4. Replace App.tsx with this file
// 5. npm run build
// 6. Upload dist/ to Netlify OR connect repo

// Optional netlify.toml:
// [build]
// command = "npm run build"
// publish = "dist"
