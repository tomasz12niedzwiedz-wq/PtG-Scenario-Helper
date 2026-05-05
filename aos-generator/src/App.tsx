// AOS Scenario Generator GOD-TIER
// Added:
// - campaign tracker
// - scenario history
// - export JSON
// - extended Ravaged Coast data structure

import { useState, useEffect } from "react";
import "./index.css";

// ================= TYPES =================
type Player = {
  id: string;
  name: string;
  emberstoneShards: number;
};

type Scenario = {
  battleplan: any;
  twist: any;
  emberstone: number | null;
  date: string;
};

// ================= DATA =================
const BATTLEPLANS = [
  { name: "Rift in the Peaks", description: "Control shifting objectives" },
  { name: "Rise Through the Ashes", description: "Climb and survive" },
  { name: "Raid on Hel's Claw", description: "Strike enemy stronghold" }
];

const TWISTS = [
  { name: "Ash Storm", desc: "Visibility reduced" },
  { name: "Corruption", desc: "Units decay" },
  { name: "Arcane Surge", desc: "Magic empowered" }
];

// ================= HELPERS =================
const rand = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// ================= STORAGE =================
const save = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));
const load = (key: string) => JSON.parse(localStorage.getItem(key) || "null");

// ================= APP =================
export default function App() {
  const [players, setPlayers] = useState<Player[]>(load("players") || []);
  const [history, setHistory] = useState<Scenario[]>(load("history") || []);

  const [name, setName] = useState("");
  const [shards, setShards] = useState(0);

  const [battleplan, setBattleplan] = useState<any>(null);
  const [twist, setTwist] = useState<any>(null);
  const [emberstone, setEmberstone] = useState<number | null>(null);

  useEffect(() => save("players", players), [players]);
  useEffect(() => save("history", history), [history]);

  const addPlayer = () => {
    if (!name) return;
    setPlayers([...players, { id: crypto.randomUUID(), name, emberstoneShards: shards }]);
    setName("");
    setShards(0);
  };

  const generate = () => {
    const bp = rand(BATTLEPLANS);
    const tw = rand(TWISTS);
    const em = Math.floor(Math.random() * 3) + 1;

    setBattleplan(bp);
    setTwist(tw);
    setEmberstone(em);

    const scenario = {
      battleplan: bp,
      twist: tw,
      emberstone: em,
      date: new Date().toLocaleString()
    };

    setHistory([scenario, ...history]);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aos-history.json";
    a.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">AOS Generator GOD-TIER</h1>

      {/* PLAYERS */}
      <div>
        <h2>Players</h2>
        <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" value={shards} onChange={e => setShards(Number(e.target.value))} />
        <button onClick={addPlayer}>Add</button>

        {players.map(p => (
          <div key={p.id}>{p.name} ({p.emberstoneShards})</div>
        ))}
      </div>

      {/* GENERATE */}
      <button onClick={generate}>Generate Scenario</button>

      {/* RESULT */}
      {battleplan && (
        <div>
          <h2>Result</h2>
          <p>{battleplan.name}</p>
          <p>{twist.name}</p>
          <p>Emberstone: {emberstone}</p>
        </div>
      )}

      {/* HISTORY */}
      <div>
        <h2>History</h2>
        {history.map((h, i) => (
          <div key={i}>
            {h.date} - {h.battleplan.name}
          </div>
        ))}
      </div>

      <button onClick={exportJSON}>Export JSON</button>
    </div>
  );
}
