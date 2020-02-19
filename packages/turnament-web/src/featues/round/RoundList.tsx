import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import RoundListeItem from "./RoundListItem";
import { Match, Player } from "turnament-scheduler";

interface IProps {
  players: Player[];
  round: Match[];
}

export default function RoundList({ players, round }: IProps) {
  const getPlayer = (pr: number): Player => players.find(p => p.ID === pr)!;
  const names = round.map(({ pairing }: Match): [string, string] => {
    return [getPlayer(pairing[0]).name!, getPlayer(pairing[1]).name!];
  });

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">Player 1</TableCell>
          <TableCell align="left">Player 2</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {round.map((match, index) => (
          <RoundListeItem key={match.ID} match={match} names={names[index]} />
        ))}
      </TableBody>
    </Table>
  );
}
