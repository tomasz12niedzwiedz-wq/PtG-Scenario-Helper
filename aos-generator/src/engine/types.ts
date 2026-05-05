export type Faction = {
  StormcastEternals: "Stormcast Eternals";
  Skaven: "Skaven";
  Nighthaunt: "Nighthaunt";
};

export type Player = {
  id: string;
  name: string;
  faction: Faction;
  emberstone: number;
  wins: number;
  isUnderdog?: boolean;
};

export type MapScenario = {
  id: string;
  name: string;
  description: string;
  image: string;
  objectives: string;
  emberstoneNodes: number;
  deployment: string;  winCondition: string;};

export type Twist = {
  diceRoll: string;
  name: string;
  effect: string;
};

export type GameSession = {
  id: string;
  map: MapScenario;
  players: Player[];
  twistOptions: Twist[];
  emberstoneAwarded: number;
  date: number;
};