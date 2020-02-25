import { List, makeStyles } from "@material-ui/core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animated, interpolate, useSprings } from "react-spring";
import { DragProps } from "./PlayerListItem";
import PlayerListItem from "./PlayerListItem";

// Returns fitting styles for dragged/idle items
const fn = (
  order: number[],
  down: boolean = false,
  originalIndex: number,
  curIndex: number,
  y: number,
  originalHeight: number,
  immediate: boolean = false
) => (index: number) => {
  return down && index === originalIndex
    ? {
        y: curIndex * originalHeight + y,
        scale: 1.1,
        zIndex: 1,
        shadow: 3,
        immediate: (n: string) => n === "y" || n === "zIndex"
      }
    : {
        y: order.indexOf(index) * originalHeight,
        scale: 1,
        zIndex: 0,
        shadow: 0,
        immediate: (n: string) => immediate || false
      };
};

const useStyles = makeStyles(theme => ({
  list: {
    position: "relative",
    userSelect: "none",
    overscrollBehavior: "contain"
  },
  listItem: {
    position: "absolute",
    width: "100%",
    transformOrigin: "50% 50% 0px"
    // touchAction: "none"
  }
}));

interface IProps {
  items: string[];
  order: number[];
  removePlayer: (id: number) => void;
  reorderList: (order: number[]) => void;
  draggable: boolean;
}

export default function PlayerList({
  items = [],
  order = [],
  removePlayer,
  reorderList,
  draggable
}: IProps) {
  const classes = useStyles();
  const orderRef = useRef<number[]>([]);
  const itemsRef = useRef<HTMLElement[]>([]);
  const dragsRef = useRef<HTMLElement[]>([]);
  const [listHeight, setListHeight] = useState<number>(0);
  const [itemHeight, setItemHeight] = useState<number>(0);
  const [springs, setSprings] = useSprings(
    items.length,
    fn(orderRef.current, false, 0, 0, 0, itemHeight)
  );

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  useEffect(() => {
    itemsRef.current = new Array(order.length);
    dragsRef.current = new Array(order.length);
  }, [order]);

  useLayoutEffect(() => {
    if (itemsRef.current[0]) {
      setItemHeight(itemsRef.current[0].offsetHeight);
      setListHeight(itemsRef.current[0].offsetHeight * order.length);
    }
  }, [order]);

  useEffect(() => {
    //@ts-ignore
    setSprings(fn(orderRef.current, false, 0, 0, 0, itemHeight, draggable));
  }, [itemHeight, setSprings, order, draggable]);

  const updateDrag = (dragProps: DragProps | undefined) => {
    if (!dragProps) return;

    const newFn = fn(
      dragProps.order,
      dragProps.down,
      dragProps.originalIndex,
      dragProps.curIndex,
      dragProps.y,
      dragProps.itemHeight
    );
    // @ts-ignore
    setSprings(newFn); // Feed springs new style data, they'll animate the view without causing a single render

    if (!dragProps.down) {
      orderRef.current = dragProps.order;
      reorderList(dragProps.order);
    }
  };

  return (
    <>
      <List className={classes.list} style={{ height: listHeight }}>
        {springs.map(({ zIndex, shadow, y, scale }, idx) => (
          <animated.div
            ref={el => (itemsRef.current[idx] = el!)}
            key={idx}
            className={classes.listItem}
            style={{
              zIndex,
              boxShadow: shadow.interpolate(
                s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
              transform: interpolate(
                [y, scale],
                (y, s) => `translate3d(0,${y}px,0) scale(${s})`
              )
            }}
            children={
              <PlayerListItem
                name={items[idx]}
                originalIndex={idx}
                draggable={draggable}
                removePlayer={removePlayer}
                updateDrag={updateDrag}
                orderRef={orderRef}
              />
            }
          />
        ))}
      </List>
    </>
  );
}
