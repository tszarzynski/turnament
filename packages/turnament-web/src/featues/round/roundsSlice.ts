import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getRanking,
  getSchedulerByType,
  Match,
  Player,
  SchedulerType,
  isEliminator,
} from 'turnament-scheduler';
import { RootState } from '../../app/reducers';
import {
  selectPlayersListAsArray,
  deactivatePlayer,
} from '../players/playersSlice';
import { AppThunk } from '../../app/store';

interface RoundsState {
  schedulerType: SchedulerType | undefined;
  matches: Record<string, Match>;
  currentRoundNum: number;
}

let initialState: RoundsState = {
  schedulerType: undefined,
  matches: {},
  currentRoundNum: 0,
};

const roundsSlice = createSlice({
  name: 'rounds',
  initialState,
  reducers: {
    setSchedulerType(
      state,
      { payload }: PayloadAction<{ schedulerType: SchedulerType }>
    ) {
      const { schedulerType } = payload;

      state.schedulerType = schedulerType;
    },
    addRound(state, { payload }: PayloadAction<{ players: Player[] }>) {
      const { players } = payload;

      if (!state.schedulerType) return;

      const roundID = ++state.currentRoundNum;

      const scheduler = getSchedulerByType(state.schedulerType);
      const rounds = Object.values(state.matches);

      const newRound = scheduler.makeRound(players, rounds, roundID);

      if (isEliminator(scheduler)) {
        scheduler.eliminate(players, rounds);
      }

      state.matches = {
        ...state.matches,
        ...newRound.reduce((acc, match) => {
          acc[match.ID] = match;
          return acc;
        }, {} as Record<string, Match>),
      };
    },
    readdRound(state, { payload }: PayloadAction<{ players: Player[] }>) {
      const { players } = payload;

      if (!state.schedulerType) return;

      const roundID = state.currentRoundNum;
      const roundsWithoutCurrent = Object.values(state.matches).filter(
        (round) => round.roundID !== roundID
      );

      const scheduler = getSchedulerByType(state.schedulerType);
      const newRound = scheduler.makeRound(
        players,
        Object.values(state.matches),
        roundID
      );

      state.matches = [...roundsWithoutCurrent, ...newRound].reduce(
        (acc, match) => {
          acc[match.ID] = match;
          return acc;
        },
        {} as Record<string, Match>
      );
    },
    updateMatch(state, { payload }: PayloadAction<{ matchToUpdate: Match }>) {
      const { matchToUpdate } = payload;

      state.matches[matchToUpdate.ID] = matchToUpdate;
    },
    resetRounds() {
      return initialState;
    },
  },
});

/**
 * Selectors
 */

export const selectSchedulerType = (state: RootState) =>
  state.rounds.schedulerType;

export const selectMatchesAsArray = (state: RootState) =>
  Object.values(state.rounds.matches);

export const selectRankedPlayers = (state: RootState) =>
  getRanking(selectPlayersListAsArray(state), selectMatchesAsArray(state));

export const selectCurrentRound = (state: RootState): Match[] =>
  selectMatchesAsArray(state).filter(
    (match) => match.roundID === state.rounds.currentRoundNum && !match.hasBye
  );
export const selectCurrentRoundNumber = (state: RootState): number =>
  state.rounds.currentRoundNum;

export const selectIsRoundCompleted = (state: RootState): boolean =>
  selectCurrentRound(state).every(({ result }) => result[0] !== result[1]);

export const selectAllRoundIDs = (state: RootState) =>
  Array.from(
    new Set<number>(selectMatchesAsArray(state).map((match) => match.roundID))
  );

export const selectMatchesByRoundID = (state: RootState, roundID: number) =>
  selectMatchesAsArray(state).filter((match) => match.roundID === roundID);

/**
 * Thunks
 */

export const nextRound = (): AppThunk => (dispatch, getState) => {
  const schedulerType = selectSchedulerType(getState());
  const players = selectPlayersListAsArray(getState());

  if (schedulerType) {
    const scheduler = getSchedulerByType(schedulerType);

    if (isEliminator(scheduler)) {
      const rounds = selectMatchesAsArray(getState());
      const playersToEliminate = scheduler.eliminate(players, rounds);

      playersToEliminate.forEach((player) =>
        dispatch(deactivatePlayer({ playerID: player.ID }))
      );
    }
  }

  dispatch(addRound({ players }));
};

export const {
  setSchedulerType,
  addRound,
  readdRound,
  updateMatch,
  resetRounds,
} = roundsSlice.actions;
export default roundsSlice.reducer;
