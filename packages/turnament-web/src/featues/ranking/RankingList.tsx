import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  makeStyles
} from "@material-ui/core";
import { PlayerWithStats } from "turnament-scheduler";
import React from "react";
import RankingListItem from "./RankingListItem";
import { StyledTableCell } from "./styled";

interface Props {
  players: PlayerWithStats[];
  deactivatePlayer: (id: number) => void;
}

export default function RankingList({ players, deactivatePlayer }: Props) {
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <StyledTableCell>#</StyledTableCell>
          <StyledTableCell align="right">Name</StyledTableCell>
          <StyledTableCell align="right">Wins</StyledTableCell>
          <StyledTableCell align="right">Pts</StyledTableCell>
          <StyledTableCell align="right">OMV</StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {players.map((player, index) => (
          <RankingListItem
            key={player.ID}
            rank={index + 1}
            player={player}
            deactivatePlayer={deactivatePlayer}
          />
        ))}
      </TableBody>
    </Table>
  );
}
