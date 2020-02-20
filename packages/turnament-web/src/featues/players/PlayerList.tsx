import { List, makeStyles } from "@material-ui/core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animated, interpolate, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import PlayerForm from "./PlayerForm";
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
        shadow: 15,
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
const clamp = (n: number, lower: number, upper: number) =>
  Math.min(Math.max(n, lower), upper);
const move = (arr: number[], from: number, to: number) => {
  const newArr = arr.slice();
  newArr.splice(to, 0, newArr.splice(from, 1)[0]);
  return newArr;
};

const useStyles = makeStyles(theme => ({
  list: {
    position: "relative",
    userSelect: "none"
  },
  listItem: {
    position: "absolute",
    width: "100%",
    transformOrigin: "50% 50% 0px"
  }
}));

interface IProps {
  items: string[];
  order: number[];
  addPlayer: (name: string) => void;
  removePlayer: (id: number) => void;
  reorderList: (order: number[]) => void;
}

export default function PlayerList({
  items = [],
  order = [],
  addPlayer,
  removePlayer,
  reorderList
}: IProps) {
  const classes = useStyles();
  const orderRef = useRef<number[]>([]);
  const itemsRef = useRef<HTMLElement[]>([]);
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
  }, [order]);

  useLayoutEffect(() => {
    if (itemsRef.current.length > 0) {
      setItemHeight(itemsRef.current[0].offsetHeight);
      setListHeight(itemsRef.current[0].offsetHeight * order.length);
    }
  }, [order]);

  useEffect(() => {
    //@ts-ignore
    setSprings(fn(orderRef.current, false, 0, 0, 0, itemHeight, true));
  }, [itemHeight, setSprings, order]);

  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const curIndex = orderRef.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * itemHeight + y) / itemHeight),
      0,
      order.length - 1
    );
    const newOrder = move(orderRef.current, curIndex, curRow);
    const newFn = fn(newOrder, down, originalIndex, curIndex, y, itemHeight);
    // @ts-ignore
    setSprings(newFn); // Feed springs new style data, they'll animate the view without causing a single render

    if (!down) {
      orderRef.current = newOrder;
      reorderList(newOrder);
    }
  });
  return (
    <div>
      <List className={classes.list} style={{ height: listHeight }}>
        {springs.map(({ zIndex, shadow, y, scale }, idx) => (
          <animated.div
            ref={el => (itemsRef.current[idx] = el!)}
            {...bind(idx)}
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
                index={idx}
                removePlayer={removePlayer}
              />
            }
          />
        ))}
      </List>
      <PlayerForm addPlayer={addPlayer} />
    </div>
  );
}
