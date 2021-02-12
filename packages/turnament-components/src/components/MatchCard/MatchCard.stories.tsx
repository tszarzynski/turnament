import React from "react";
import MatchCard from "./MatchCard";
import { Match } from "turnament-scheduler";

export default {
  component: MatchCard,
  title: "MatchCard"
};


const names: [string, string] = ["Name1", "Name2"];
const match: Match = {
  ID: "ID",
  roundID: 1,
  hasBye: false,
  pairing: [1, 2],
  result: [0, 0]
};

export const Default = () => {
  return <MatchCard match={match} names={names} onScoreChange={() => null} />;
};

export const Archived = () => {
  return <MatchCard match={match} names={names} isArchived={true} onScoreChange={() => null} />;
};
