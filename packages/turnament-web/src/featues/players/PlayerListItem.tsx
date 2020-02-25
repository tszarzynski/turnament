import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { RefObject, useRef, useEffect, useState } from "react";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { clamp, move } from "../../utils/arrayUtils";

export interface DragProps {
  order: number[];
  down: boolean;
  originalIndex: number;
  curIndex: number;
  y: number;
  itemHeight: number;
}

const useDraggable = (
  dragHandle: HTMLElement | undefined,
  orderRef: RefObject<number[]>,
  originalIndex: number
) => {
  const [draggable, setDraggable] = useState(false);
  const [dragProps, setDrapProps] = useState<DragProps | undefined>();
  const dragPropsRef = useRef<DragProps>();

  const bind = useDrag(
    ({ down, movement: [, y] }) => {
      if (!draggable) return;

      if (!orderRef.current) return;

      const curIndex = orderRef.current.indexOf(originalIndex);
      const curRow = clamp(
        Math.round((curIndex * 48 + y) / 48),
        0,
        orderRef.current.length - 1
      );
      const order = move(orderRef.current, curIndex, curRow);

      setDrapProps({ order, down, originalIndex, curIndex, y, itemHeight: 48 });
    },
    {
      domTarget: dragHandle
    }
  );

  return { bind, setDraggable, dragProps };
};

interface IProps {
  name: string;
  draggable: boolean;
  removePlayer: (id: number) => void;
  originalIndex: number;
  orderRef: RefObject<number[]>;
  updateDrag: (dragProps: DragProps | undefined) => void;
}

function PlayerListItem({
  name,
  originalIndex,
  draggable,
  removePlayer,
  orderRef,
  updateDrag
}: IProps) {
  const dragIndicatorSpringProps = useSpring({
    opacity: draggable ? 1 : 0,
    width: draggable ? "auto" : 0
  });

  const dragRef = useRef<HTMLElement | undefined>();
  const { bind, dragProps, setDraggable } = useDraggable(
    dragRef.current,
    orderRef,
    originalIndex
  );

  useEffect(() => {
    updateDrag(dragProps);
  }, [dragProps, updateDrag]);

  useEffect(() => {
    setDraggable(s => draggable);
  }, [draggable, setDraggable]);

  return (
    <ListItem {...bind()}>
      <animated.div style={dragIndicatorSpringProps}>
        <ListItemIcon ref={(el: HTMLElement) => (dragRef.current = el)}>
          <DragIndicatorIcon />
        </ListItemIcon>
      </animated.div>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => removePlayer(originalIndex)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default React.memo(PlayerListItem);
