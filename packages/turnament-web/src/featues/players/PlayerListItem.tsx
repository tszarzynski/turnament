import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

interface IProps {
  name: string;
  index: number;
  removePlayer: (id: number) => void;
}

function PlayerListItem({ name, index, removePlayer }: IProps) {
  return (
    <ListItem>
      <ListItemIcon>
        <DragIndicatorIcon />
      </ListItemIcon>
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
