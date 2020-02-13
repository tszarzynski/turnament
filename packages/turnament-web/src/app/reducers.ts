import { combineReducers } from "redux";
import playersReducer from "../featues/players/playersSlice";
import roundsReducer from "../featues/round/roundsSlice";

const rootReducer = combineReducers({
  players: playersReducer,
  rounds: roundsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
