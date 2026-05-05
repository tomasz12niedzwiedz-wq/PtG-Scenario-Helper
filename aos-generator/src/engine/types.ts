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

export type Objective = {
  id: string;
  x: number;
  y: number;
};

export type MapScenario = {
  id: string;
  name: string;
  image: string;
  objectives: Objective[];
  emberstoneNodes: number;
  deployment: string;
};

export type Twist = {
  id: string;
  name: string;
  effect: string;
  isUnderdogChoice?: boolean;
};

export type GameSession = {
  id: string;
  map: MapScenario;
  players: Player[];
  twistOptions: Twist[]; // 👈 zamiast twist
  emberstoneAwarded: number;
  date: number;
};