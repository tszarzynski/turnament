import {
  createStyles,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  Theme
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { PlayerWithStats } from "turnament-scheduler";

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
      <TableCell component="th" scope="row">
        {rank}
      </TableCell>
      <TableCell align="right">{player.name}</TableCell>
      <TableCell align="right">{player.matchesWon}</TableCell>
      <TableCell align="right">{player.gamesWon}</TableCell>
      <TableCell align="right">{player.omv}</TableCell>
      <TableCell align="right">
        {player.active && (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deactivatePlayer(player.ID)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
