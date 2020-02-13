type PlayerID = number;

export interface Player {
  ID: PlayerID;
  name?: string;
  seed?: number;
}

export type Results = {
  gamesWon: number;
  matchesWon: number;
  matchesLost: number;
  opponents: PlayerID[];
};

export type Stats = {
  omv: number;
}

export interface PlayerWithResults extends Player, Results {}

export interface PlayerWithStats extends Player, Results, Stats {}

export interface PlayerWithBye extends Player {
  bye: number;
}

export type Match = {
  ID: string;
  roundID: number;
  pairing: Pairing;
  result: [number, number];
  hasBye: boolean;
};

/**
 * Represents players paring
 */
export type Pairing = [PlayerID, PlayerID];

/**
 * Helper for graph operations [node,node,weight]
 */
export type GraphEdge = [number, number, number];


export type TournamentType = "SWISS" | "ROUNDROBIN";

export interface Tournament {
  makeRound: (players: Player[], results: Match[], roundID: number)=> Match[];
  roundsNeeded: (numPlayers: number) => number
}
