import type { Twist } from "../engine/types";

export const twists: Twist[] = [
  {
    id: "0",
    table: "No table",
    name: "There is no effect",
    effect: "N/A",
  },
  {
    id: "1",
    table: "Volcanic Incandescence",
    name: "Steam Vent",
    effect: "The underdog can pick a terrain feature within neutral territory. If there are no terrain features within neutral territory, the underdog can pick any terrain feature on the battlefield instead. Inflict D3 mortal damage on each unit within 1\" of that terrain feature.",
  },
    {
    id: "1",
    table: "Volcanic Incandescence",
    name: "Magmic Blast",
    effect: "The underdog can pick an objective. Roll a D3 for each unit contesting that objective. On a 2+, inflict an amount of mortal damage on that unit equal to the roll. If there are no objectives on the battlefield, this twist has no effect",
  },
    {
    id: "1",
    table: "Volcanic Incandescence",
    name: "Pyroclastic Flow",
    effect: "The underdog can pick a friendly unit. Add 1 to charge rolls for that unit for the rest of the battle round.",
  },
  {
    id: "1",
    table: "Volcanic Incandescence",
    name: "Emberstone Uncovered",
    effect: "The underdog can set up an additional emberstone cluster on the battlefield. It must be set up more than 6\" from all units, other emberstone clusters, objectives and battlefield edges. If this is not possible, this twist has no effect.",
  },
  {
    id: "2",
    table: "Mounting corruption",
    name: "Mounting corruption",
    effect: "New emberstone appears mid-game.",
  },
  {
    id: "3",
    table: "Ash Storm",
    name: "Ash Storm",
    effect: "Random units suffer damage each round.",
  },
  {
    id: "4",
    table: "Raging Winds",
    name: "Raging Winds",
    effect: "Explosive zones activate randomly.",
  },
  {
    id: "5",
    table: "The player whose general has the lowest random picks twist table",
    name: "Raging Winds",
    effect: "Explosive zones activate randomly.",
  },
];