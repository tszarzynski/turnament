import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

interface IProps {
  name: string;
  index: number;
  removePlayer: (id: number) => void;
}

function PlayerListItem({ name, index, removePlayer }: IProps) {
  return (
    <ListItem>
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
    </ListItem>
  );
}

export default React.memo(PlayerListItem);
