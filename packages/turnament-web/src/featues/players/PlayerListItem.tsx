import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { Player } from "turnament-scheduler";

interface IProps {
  player: Player;
  removePlayer: (id: number) => void;
}

export default function PlayerListItem({ player, removePlayer }: IProps) {
  return (
    <ListItem>
      <ListItemText primary={player.name} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => removePlayer(player.ID)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
