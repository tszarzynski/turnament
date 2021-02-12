import { Match } from 'turnament-scheduler';

export type MatchWithNames = Match & { names: [string, string] };
