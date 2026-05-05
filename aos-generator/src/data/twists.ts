import type { Twist } from "../engine/types";

export const twistGroups: Record<string, Twist[]> = {
  "0": [
    {
      diceRoll: "No roll",
      name: "There is no effect",
      effect: "N/A",
    },
  ],
  "1": [
    {
      diceRoll: "1 - 2",
      name: "Steam Vent",
      effect: "The underdog can pick a terrain feature within neutral territory. If there are no terrain features within neutral territory, the underdog can pick any terrain feature on the battlefield instead. Inflict D3 mortal damage on each unit within 1\" of that terrain feature.",
    },
    {
      diceRoll: "3 - 4",
      name: "Magmic Blast",
      effect: "The underdog can pick an objective. Roll a D3 for each unit contesting that objective. On a 2+, inflict an amount of mortal damage on that unit equal to the roll. If there are no objectives on the battlefield, this twist has no effect.",
    },
    {
      diceRoll: "5",
      name: "Pyroclastic Flow",
      effect: "The underdog can pick a friendly unit. Add 1 to charge rolls for that unit for the rest of the battle round.",
    },
    {
      diceRoll: "6",
      name: "Emberstone Uncovered",
      effect: "The underdog can set up an additional emberstone cluster on the battlefield. It must be set up more than 6\" from all units, other emberstone clusters, objectives and battlefield edges. If this is not possible, this twist has no effect.",
    },
  ],
  "2": [
    {
      diceRoll: "1 - 2",
      name: "Verminous Infestation",
      effect: "The underdog can pick an enemy unit that is contesting an objective that the underdog controls. That unit has STRIKE-LAST for the rest of the battle round.",
    },
        {
      diceRoll: "3 - 4",
      name: "Unnatural Empowerment",
      effect: "The underdog can pick a friendly unit. Add 5 to that unit's control score for the rest of the battle round.",
    },
        {
      diceRoll: "5",
      name: "Rabid Plunderers",
      effect: "For the rest of the battle round, when using the 'Collect Emberstone' ability, the underdog can re-roll the dice.",
    },
        {
      diceRoll: "6",
      name: "Emberstone Uncovered",
      effect: "The underdog can set up an additional emberstone cluster on the battlefield. It must be set up more than 6\" from all units, other emberstone clusters, objectives and battlefield edges. If this is not possible, this twist has no effect.",
    },
  ],
  "3": [
    {
      diceRoll: "1 - 2",
      name: "Cinder Squall",
      effect: "The underdog can pick a friendly unit. For the rest of the battle round, that unit cannot be picked as the target of shooting attacks made by units more than 12\" from it.",
    },
        {
      diceRoll: "3 - 4",
      name: "Claggy Sands",
      effect: "The underdog can pick an enemy unit. Subtract 2 from run rolls for that unit for the rest of the battle round.",
    },
        {
      diceRoll: "5",
      name: "Soot Rain",
      effect: "For the rest of the battle round, no mortal damage is inflicted on units in the underdog's army by the 'Retreat' ability.",
    },
        {
      diceRoll: "6",
      name: "Emberstone Uncovered",
      effect: "The underdog can set up an additional emberstone cluster on the battlefield. It must be set up more than 6\" from all units, other emberstone clusters, objectives and battlefield edges. If this is not possible, this twist has no effect.",
    },
  ],
  "4": [
    {
      diceRoll: "1 - 2",
      name: "Blistering Wrath",
      effect: "The underdog can pick a friendly unit. Add 1 to wound rolls for that unit's combat attacks for the rest of the battle round.",
    },
    {
      diceRoll: "3 - 4",
      name: "Untempered Indignation",
      effect: "The underdog can pick an objective. Add 1 to hit rolls for combat attacks made by friendly and enemy units that target units contesting that objective for the rest of the battle round.",
    },
    {
      diceRoll: "5",
      name: "Furious Storm",
      effect: "The underdog can pick a friendly unit. For the rest of the battle round, add 1 to the Attacks characteristic of that unit's melee weapons while it is in combat with an enemy unit that charged in the same turn.",
    },
    {
      diceRoll: "6",
      name: "Raging Winds",
      effect: "The underdog can set up an additional emberstone cluster on the battlefield. It must be set up more than 6\" from all units, other emberstone clusters, objectives and battlefield edges. If this is not possible, this twist has no effect.",
    },
  ],
};
