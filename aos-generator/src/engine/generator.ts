import { maps } from "../data/maps";
import { twistGroups } from "../data/twists";
import type { Player, GameSession, Twist } from "./types";

const roll = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function getRandomTwistById(): Twist {
  const groupIds = Object.keys(twistGroups);
  const selectedGroupId = roll(groupIds);
  const group = twistGroups[selectedGroupId];
  return roll(group);
}

export function getRandomTwists(): Twist[] {
  const groupIds = Object.keys(twistGroups);
  const selectedGroupId = roll(groupIds);
  return twistGroups[selectedGroupId] ?? [];
}

export function determineUnderdog(players: Player[]) {
  const sorted = [...players].sort(
    (a, b) => a.wins - b.wins || a.emberstone - b.emberstone,
  );

  sorted.forEach((p) => (p.isUnderdog = false));
  sorted[0].isUnderdog = true;

  return sorted;
}

export function generateScenario(players: Player[]): GameSession {
  const updatedPlayers = determineUnderdog(players);

  const map = {
    ...roll(maps),
    emberstoneNodes: Math.floor(Math.random() * 3) + 2,
  };

  const twistOptions = getRandomTwists();

  return {
    id: crypto.randomUUID(),
    map,
    players: updatedPlayers,
    twistOptions,
    emberstoneAwarded: map.emberstoneNodes,
    date: Date.now(),
  };
}
