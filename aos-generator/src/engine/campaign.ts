import { Player } from "./types";

export type Upgrade = {
  id: string;
  name: string;
  cost: number;
  effect: string;
};

export const upgrades: Upgrade[] = [
  {
    id: "u1",
    name: "Blessed Weapons",
    cost: 3,
    effect: "+1 attack first round",
  },
  {
    id: "u2",
    name: "Warp Infusion",
    cost: 5,
    effect: "reroll 1 dice per turn",
  },
];

export function buyUpgrade(player: Player, upgrade: Upgrade) {
  if (player.emberstone >= upgrade.cost) {
    player.emberstone -= upgrade.cost;
    return true;
  }
  return false;
}