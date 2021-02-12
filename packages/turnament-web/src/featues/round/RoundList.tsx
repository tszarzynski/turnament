import React from "react";
import { useDispatch } from "react-redux";
import { MatchCard } from "turnament-components";
import { Match, Player } from "turnament-scheduler";
import { updateMatch } from "./roundsSlice";
import { List } from "@material-ui/core";

interface IProps {
  players: Player[];
  round: Match[];
}

export default function RoundList({ players, round }: IProps) {
  const dispatch = useDispatch();
  const getPlayer = (pr: number): Player => players.find(p => p.ID === pr)!;
  const names = round.map(({ pairing, hasBye }: Match): [string, string] => [
    pairing[0] !== -1 ? getPlayer(pairing[0]).name! : "BYE",
    pairing[1] !== -1 ? getPlayer(pairing[1]).name! : "BYE"
  ]);

  const handleScoreChange = (matchToUpdate: Match) => {
    dispatch(updateMatch({ matchToUpdate }));
  };

  return (
    <List>
      {round.map((match, index) => (
        <MatchCard
          key={match.ID}
          match={match}
          names={names[index]}
          onScoreChange={handleScoreChange}
        />
      ))}
    </List>
  );
}
