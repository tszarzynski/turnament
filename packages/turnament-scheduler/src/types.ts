export type PlayerID = number;
export type MatchID = string;
export type RoundID = number;
export type MatchResult = [number, number];

export interface Player {
	ID: PlayerID;
	name: string;
	active: boolean;
	seed?: number;
}

export interface Results {
	// number of individual games won
	gamesWon: number;
	// number of matches won
	matchesWon: number;
	// number of matches lost
	matchesLost: number;
	// list of opponents played so far
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
	ID: MatchID;
	roundID: RoundID;
	pairing: Pairing;
	result: MatchResult;
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

export type SchedulerType = "SWISS" | "ROUND_ROBIN" | "ELIMINATION" | "AMALFI";

export interface Scheduler {
	makeRound: (players: Player[], results: Match[], roundID: RoundID) => Match[];
	roundsNeeded: (numPlayers: number) => number;
	type: SchedulerType;
	name?: string;
}

export interface Eliminator {
	eliminate: (players: Player[], results: Match[]) => Player[];
}

export function isEliminator(
	scheduler: Scheduler | Eliminator,
): scheduler is Eliminator {
	return (scheduler as Eliminator).eliminate !== undefined;
}
