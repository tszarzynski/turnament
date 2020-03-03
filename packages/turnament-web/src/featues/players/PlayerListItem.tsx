import { IconButton, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

interface Props {
  name: string;
  index: number;
  removePlayer: (id: number) => void;
}

function PlayerListItem({ name, index, removePlayer }: Props) {
  return (
    <>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => removePlayer(index)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
}

export default PlayerListItem;
