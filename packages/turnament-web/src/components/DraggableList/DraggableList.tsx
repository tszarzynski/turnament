import { List, makeStyles } from "@material-ui/core";
import { clamp, distance } from "@popmotion/popcorn";
import React, { useRef } from "react";
import { move } from "../../utils/arrayUtils";
import { DraggableListItem, Position } from "./DraggableListItem";

// Prevent rapid reverse swapping
const DRAG_BUFFER = 5;

export const findIndex = (
  i: number,
  yOffset: number,
  positions: Position[]
) => {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  // If moving down
  if (yOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset =
      distance(bottom, nextItem.top + nextItem.height / 2) + DRAG_BUFFER;
    if (yOffset > swapOffset) target = i + 1;

    // If moving up
  } else if (yOffset < top) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset =
      distance(top, prevBottom - prevItem.height / 2) + DRAG_BUFFER;

    if (yOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
};

const useStyles = makeStyles(() => ({
  list: {
    position: "relative",
    userSelect: "none",
    overflowX: "hidden",
    overscrollBehavior: "contain",
  },
}));

export interface Props {
  order: number[];
  reorderList: (order: number[]) => void;
  draggable: boolean;
  rowRenderer: (orderIndex: number, index: number) => React.ReactNode;
}

export const DraggableList = ({
  order,
  rowRenderer,
  reorderList,
  draggable,
}: Props) => {
  const classes = useStyles();
  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef<Position[]>([]).current;
  const setPosition = (i: number, offset: Position) => (positions[i] = offset);

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const moveItem = (i: number, dragOffset: number) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) reorderList(move(order, i, targetIndex));
  };

  return (
    <List className={classes.list}>
      {order.map((orderIndex, index) => (
        <DraggableListItem
          key={orderIndex}
          index={index}
          draggable={draggable}
          setPosition={setPosition}
          moveItem={moveItem}
        >
          {rowRenderer(orderIndex, index)}
        </DraggableListItem>
      ))}
    </List>
  );
};
