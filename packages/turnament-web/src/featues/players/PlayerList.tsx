import { List, makeStyles } from "@material-ui/core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSprings } from "react-spring";
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

  return (
    <>
      {/* <List className={classes.list} style={{ height: listHeight }}>
        children={<PlayerListItem name={items[idx]} index={idx} />}
        /> ))}
      </List> */}
    </>
  );
}
