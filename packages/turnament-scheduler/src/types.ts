export type PlayerID = number;

export interface Player {
  ID: PlayerID;
  name?: string;
  active: boolean;
  seed?: number;
}

export interface Results {
  gamesWon: number;
  matchesWon: number;
  matchesLost: number;
  opponents: PlayerID[];
}

export interface Stats {
  omv: number;
}

export interface PlayerWithResults extends Player, Results {}

export interface PlayerWithStats extends Player, Results, Stats {}

export interface PlayerWithBye extends Player {
  bye: number;
}

export interface Match {
  ID: string;
  roundID: number;
  pairing: Pairing;
  result: [number, number];
  hasBye: boolean;
}

/**
 * Represents players paring
 */
export type Pairing = [PlayerID, PlayerID];

/**
 * Helper for graph operations [node,node,weight]
 */
export type GraphEdge = [number, number, number];

export type SchedulerType = 'SWISS' | 'ROUND_ROBIN' | 'ELIMINATION' | 'AMALFI';

export interface Scheduler {
  makeRound: (players: Player[], results: Match[], roundID: number) => Match[];
  roundsNeeded: (numPlayers: number) => number;
  type: SchedulerType;
  name?: string;
}

export interface Eliminator {
  eliminate: (players: Player[], results: Match[]) => Player[];
}

export function isEliminator(
  scheduler: Scheduler | Eliminator
): scheduler is Eliminator {
  return (scheduler as Eliminator).eliminate !== undefined;
}
