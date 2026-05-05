import { maps } from "../data/maps";
import { twists } from "../data/twists";
import type { Player, GameSession, Twist } from "./types";

const roll = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

function getTwistOptions(allTwists: Twist[], count = 3): Twist[] {
  const shuffled = [...allTwists].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomTwistById(): Twist {
  const randomId = Math.floor(Math.random() * 6).toString(); // 0 to 5
  const candidates = twists.filter(t => t.id === randomId);
  return candidates.length > 0 ? roll(candidates) : roll(twists);
}

export function determineUnderdog(players: Player[]) {
  const sorted = [...players].sort(
    (a, b) => a.wins - b.wins || a.emberstone - b.emberstone
  );

  // reset flagów
  sorted.forEach(p => (p.isUnderdog = false));

  // ustaw underdoga
  sorted[0].isUnderdog = true;

  return sorted;
}

export function generateScenario(players: Player[]): GameSession {
  const updatedPlayers = determineUnderdog(players);

  const map = {
    ...roll(maps),
    emberstoneNodes: Math.floor(Math.random() * 3) + 2,
  };

  // 🎴 3 różne twisty do wyboru
  const twistOptions = getTwistOptions(twists, 3);

  return {
    id: crypto.randomUUID(),
    map,
    players: updatedPlayers,
    twistOptions, // 👈 KLUCZOWE
    emberstoneAwarded: map.emberstoneNodes,
    date: Date.now(),
  };
}