import type { MapScenario } from "../engine/types";

export const maps: MapScenario[] = [
  {
    id: "m1",
    name: "Rift in the Peaks",
    image: "/assets/Ravaged1.png",
    objectives: "Set up 3 objectives as shown on the map.",
    emberstoneNodes: 0,
    description:
      "The player who has the lowest total number of emberstone shards picks which player uses the Northern Territory and which player uses the Southern Territory. If the players have the same total number of emberstone shards, roll off and the winner picks.",
    deployment: "The player who assigned territories begins deployment.",
    winCondition:
      "Each player scores 1 victory point at the end of their turn for each objective they control that is not contested by any enemy units.",
  },
  {
    id: "m2",
    name: "Rise Through the Ashes",
    image: "/assets/Ravaged2.png",
    objectives: "Set up 3 objectives as shown on the map.",
    emberstoneNodes: 0,
    description:
      "The player who has the lowest total number of emberstone shards picks which player uses the Northern Territory and which player uses the Southern Territory. If the players have the same total number of emberstone shards, roll off and the winner picks.",
    deployment: "The player who assigned territories begins deployment.",
    winCondition:
      "Take and Hold: Each player scores 1 victory point at the end of their turn for each objective they control.",
  },
  {
    id: "m3",
    name: "Ransack the Encampment",
    image: "/assets/Ravaged4.png",
    objectives: "Set up 3 objectives as shown on the map.",
    emberstoneNodes: 0,
    description:
      "The player who has the lowest total number of emberstone shards picks which player is the defender and which player is the raider. If the players have the same total number of emberstone shards, roll off and the winner picks.",
    deployment:
      'The player who assigned roles begins deployment. Units can be set up more than 6" from enemy territory instead of more than 9" from enemy territory.',
    winCondition:
      "Take and Hold: Each player scores 1 victory point at the end of their turn for each objective they control. Lay Them Low: The raider scores 1 victory point at the end of each turn for each enemy unit they destroyed in that turn.",
  },
  {
    id: "m4",
    name: "Light the Fires",
    image: "/assets/Ravaged6.png",
    objectives: "Set up 2 objectives as shown on the map.",
    emberstoneNodes: 0,
    description:
      "The player who has the lowest total number of emberstone shards picks which player uses the Western Territory and which player uses the Eastern Territory. If the players have the same total number of emberstone shards, roll off and the winner picks.",
    deployment: "The player who assigned territories begins deployment.",
    winCondition:
      "Take and Hold: Each player scores 1 victory point at the end of their turn for each objective they control.",
  },
  {
    id: "m5",
    name: "Twisted by Rage",
    image: "/assets/Ravaged7.png",
    objectives: "None shown on map.",
    emberstoneNodes: 0,
    description:
      "The player who has the lowest total number of emberstone shards is the mark and the other player is the executioner. If the players have the same total number of emberstone shards, roll off and the winner picks which player is which.",
    deployment:
      "The executioner begins deployment. The mark can set up their units wholly within their territory instead of more than 9\" from enemy territory. Protect at all costs: Special targeting rules apply to the mark's general.",
    winCondition:
      "At the end of the battle: If the mark's general has been destroyed, the executioner wins a major victory. If the mark's general has not been destroyed, the mark wins a major victory.",
  },
  {
    id: "m6",
    name: "Storm the Land Bridge",
    image: "/assets/Ravaged8.png",
    objectives: "Set up 1 objectives as shown on the map.",
    emberstoneNodes: 0,
    description:
      "The player who has the lowest total number of emberstone shards picks which player uses the Northern Territory and which player uses the Southern Territory. If the players have the same total number of emberstone shards, roll off and the winner picks.",
    deployment:
      "The player who assigned territories begins deployment. Hold Fast!: Units contesting the objective have Strike-Last.",
    winCondition:
      "The player who controls the objective at the end of the battle wins a major victory. If neither player controls the objective at the end of the battle, the battle is a draw.",
  },
  {
    id: "m7",
    name: "Beneath the Shadow of Brazenskull",
    image: "/assets/Ravaged9.png",
    objectives: "Set up 3 objectives as shown on the map.",
    emberstoneNodes: 0,
    description:
      "The player who has the lowest total number of emberstone shards picks which player uses the Border Territories and which player uses the Central Territory. If the players have the same total number of emberstone shards, roll off and the winner picks.",
    deployment: "The player who assigned territories begins deployment.",
    winCondition:
      "The player who controls the most objectives at the end of the battle wins a major victory. If both players control the same number of objectives at the end of the battle, the battle is a draw.",
  },
  {
    id: "m8",
    name: "Assault on the Sea Cave",
    image: "/assets/Ravaged10.png",
    objectives: "Set up 4 objectives as shown on the map.",
    emberstoneNodes: 4,
    description:
      "The player who has the lowest total number of emberstone shards picks which player is the ransacker and which player is the hoarder. If the players have the same total number of emberstone shards, roll off and the winner picks.",
    deployment:
      'The player who assigned roles begins deployment. Units can be set up more than 3" from enemy territory instead of more than 9" from enemy territory. Smash and Grab: The ransacker can remove objectives they control.',
    winCondition:
      "At the end of the battle: No objectives = ransacker victory. 1 objective = draw. 2+ objectives = hoarder victory.",
  },
  {
    id: "m9",
    name: "Along the Crumbling Coast",
    image: "/assets/Ravaged11.png",
    objectives: "Set up 3 objectives as shown on the map.",
    emberstoneNodes: 0,
    description:
      "The player who has the lowest total number of emberstone shards picks which player uses the Crumbling Territories and which player uses the Reformed Territories. If the players have the same total number of emberstone shards, roll off and the winner picks.",
    deployment: "The player who assigned territories begins deployment.",
    winCondition:
      "Take and Hold: 1 VP for each controlled objective. Fortified Position: 1 VP for each controlled objective not contested by enemy units.",
  },
  {
    id: "m10",
    name: "Raid on Hel's Claw",
    image: "/assets/Ravaged12.png",
    objectives:
      "Set up 1 objective as shown on the map to be the emberstone trove.",
    emberstoneNodes: 0,
    description:
      "The player who has the lowest total number of emberstone shards picks territories. Both players split their armies into 2 contingents. Seize the Trove & Ever-burning Coals abilities are in effect.",
    deployment:
      "The player who assigned territories begins deployment. Each player must deploy 1 contingent wholly within their territory A and the other wholly within territory B.",
    winCondition:
      "At the end of the battle: The player whose unit is the carrier wins a major victory. If the trove is on the battlefield, the battle is a draw.",
  },
];
