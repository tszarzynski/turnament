import {
  createStyles,
  IconButton,
  makeStyles,
  TableRow,
  Theme
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { PlayerWithStats } from "turnament-scheduler";
import { StyledTableCell } from "./styled";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inactive: {
      opacity: 0.2
    }
  })
);

interface IProps {
  player: PlayerWithStats;
  rank: number;
  deactivatePlayer: (id: number) => void;
}

export default function RankingListItem({
  player,
  rank,
  deactivatePlayer
}: IProps) {
  const classes = useStyles();
  return (
    <TableRow className={player.active ? "" : classes.inactive}>
      <StyledTableCell component="th" scope="row">
        {rank}
      </StyledTableCell>
      <StyledTableCell align="right">{player.name}</StyledTableCell>
      <StyledTableCell align="right">{player.matchesWon}</StyledTableCell>
      <StyledTableCell align="right">{player.gamesWon}</StyledTableCell>
      <StyledTableCell align="right">{player.omv.toFixed(3)}</StyledTableCell>
      <StyledTableCell align="right">
        {player.active && (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deactivatePlayer(player.ID)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </StyledTableCell>
    </TableRow>
  );
}
