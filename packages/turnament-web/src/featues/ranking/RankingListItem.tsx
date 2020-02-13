import { TableCell, TableRow } from "@material-ui/core";
import { PlayerWithStats } from "turnament-scheduler";
import React from "react";

interface IProps {
  player: PlayerWithStats;
  rank: number;
}

export default function RankingListItem({ player, rank }: IProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {rank}
      </TableCell>
      <TableCell align="right">{player.name}</TableCell>
      <TableCell align="right">{player.matchesWon}</TableCell>
      <TableCell align="right">{player.gamesWon}</TableCell>
      <TableCell align="right">{player.omv}</TableCell>
    </TableRow>
  );
}
