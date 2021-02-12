import { ListItem, ListItemIcon } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { motion, useDragControls } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const draggableVariants = {
  draggable: { width: "auto", opacity: 1 },
  notDraggable: { width: 0, opacity: 0 },
};

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
  draggable,
}: Props) => {
  const [isDragging, setDragging] = useState(false);

  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef<HTMLDivElement>(null);

  const dragControls = useDragControls();

  const startDrag = (event: React.MouseEvent) => {
    dragControls.start(event, { snapToCursor: false });
  };

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    ref.current &&
      setPosition(index, {
        height: ref.current.offsetHeight,
        top: ref.current.offsetTop,
      });
  });

  return (
    <motion.div
      ref={ref}
      initial={false}
      layout
      drag="y"
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onViewportBoxUpdate={(_, delta) => {
        isDragging && moveItem(index, delta.y.translate);
      }}
    >
      <ListItem>
        <motion.div
          initial="notDraggable"
          animate={draggable ? "draggable" : "notDraggable"}
          variants={draggableVariants}
        >
          <ListItemIcon onPointerDown={startDrag}>
            <DragIndicatorIcon />
          </ListItemIcon>
        </motion.div>

        {children}
      </ListItem>
    </motion.div>
  );
};
