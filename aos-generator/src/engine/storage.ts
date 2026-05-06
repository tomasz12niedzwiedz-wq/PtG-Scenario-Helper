const KEY = "aos_players";

export function savePlayers(players: any[]) {
  localStorage.setItem(KEY, JSON.stringify(players));
}

export function loadPlayers() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}
