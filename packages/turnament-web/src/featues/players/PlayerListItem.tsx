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
import { useSpring, animated } from "react-spring";

interface IProps {
  name: string;
  index: number;
  draggable: boolean;
  removePlayer: (id: number) => void;
}

function PlayerListItem({ name, index, draggable, removePlayer }: IProps) {
  const dragIndicatorSpringProps = useSpring({
    opacity: draggable ? 1 : 0,
    width: draggable ? "auto" : 0
  });

  return (
    <ListItem>
      <animated.div style={dragIndicatorSpringProps}>
        <ListItemIcon>
          <DragIndicatorIcon />
        </ListItemIcon>
      </animated.div>
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
