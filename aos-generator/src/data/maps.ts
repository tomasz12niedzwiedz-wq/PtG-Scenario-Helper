import type { MapScenario } from "../engine/types";

export const maps: MapScenario[] = [
  {
    id: "m1",
    name: "Rift in the Peaks",
    image: "/assets/Ravaged1.png",
    objectives: "Set up 3 objectives as shown on the map.",
    emberstoneNodes: 0,
    description: "The player who has the lowest total number of emberstone shards picks which player uses the Northern Territory and which player uses the Southern Territory. If the players have the same total number of emberstone shards, roll off and the winner picks.",
    deployment: "The player who assigned territories begins deployment.",
    winCondition: "Each player scores 1 victory point at the end of their turn for each objective they control that is not contested by any enemy units."
  },
  // {
  //   id: "m2",
  //   name: "Ashen Ruins",
  //   image: "/assets/Ravaged2.png",
  //   objectives: "Set up 3 objectives as shown on the map.",
  //   emberstoneNodes: Math.floor(Math.random() * 3) + 2,
  //   description: "Ancient ruins blanketed in volcanic ash, with crumbling walls providing cover and hidden dangers.",
  //   deployment: "The player who assigned territories begins deployment.",
  //   winCondition: "Control objectives and emberstone nodes"
  // },
  // {
  //   id: "m3",
  //   name: "Stormrift Isles",
  //   image: "/assets/Ravaged4.png",
  //   objectives: "Set up 3 objectives as shown on the map.",
  //   emberstoneNodes: Math.floor(Math.random() * 3) + 2,
  //   description: "Floating islands amidst turbulent storms, connected by precarious bridges and magical rifts.",
  //   deployment: "The player who assigned territories begins deployment.",
  //   winCondition: "Control objectives and emberstone nodes"
  // },
];