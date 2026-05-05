import type { GameSession } from "./types";

const KEY = "aos_sessions";

export function saveGame(game: GameSession) {
  const data = getGames();
  data.push(game);
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getGames(): GameSession[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}