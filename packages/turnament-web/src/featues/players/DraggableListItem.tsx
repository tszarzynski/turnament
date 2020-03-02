import { ListItem, ListItemIcon } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// Spring configs
const onTop = { zIndex: 1, scale: 1.1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
  scale: 1
};

const dragableVariants = {
    dragable: {width: 'auto', opacity: 1},
    notDragable: {width: 0, opacity: 0}
}



export interface Position {
  top: number;
  height: number;
}

interface Props {
  children?: React.ReactNode;
  index: number;
  draggable: boolean;
  setPosition: (index: number, position: Position) => void;
  moveItem: (index: number, dragOffset: number) => void;
}

export const DraggableListItem = ({
  children,
  setPosition,
  moveItem,
  index,
  draggable
}: Props) => {
  const [isDragging, setDragging] = useState(false);

  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef<HTMLDivElement>(null);

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginY = useMotionValue(0);

  const dragControls = useDragControls();

  const startDrag = (event: React.MouseEvent) => {
    // setDragging(true);
    dragControls.start(event, { snapToCursor: false });
  };

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    if (!ref.current) return;

    setPosition(index, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });

  return (
    <motion.div
      ref={ref}
      initial={false}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      animate={isDragging ? onTop : flat}
      drag="y"
      dragControls={dragControls}
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      //   whileHover={{ scale: 1.03 }}
      //   whileTap={{ scale: 1.12 }}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      dragListener={false}
      onDrag={(e, { point }) => moveItem(index, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          // If we're dragging, we want to "undo" the items movement within the list
          // by manipulating its dragOriginY. This will keep the item under the cursor,
          // even though it's jumping around the DOM.
          dragOriginY.set(dragOriginY.get() + delta.y);
        }

        // If `positionTransition` is a function and returns `false`, it's telling
        // Motion not to animate from its old position into its new one. If we're
        // dragging, we don't want any animation to occur.
        return !isDragging;
      }}
    >
      <ListItem>
        <motion.div initial="notDragable" animate={draggable ? "dragable" : "notDragable"} variants={dragableVariants}>
          <ListItemIcon onPointerDown={startDrag}>
            <DragIndicatorIcon />
          </ListItemIcon>
        </motion.div>

        {children}
      </ListItem>
    </motion.div>
  );
};
