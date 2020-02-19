import { List, makeStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { animated, interpolate, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import { Player } from "turnament-scheduler";
import PlayerForm from "./PlayerForm";
import PlayerListItem from "./PlayerListItem";

// Returns fitting styles for dragged/idle items
const fn = (
  order: number[],
  down: boolean = false,
  originalIndex: number,
  curIndex: number,
  y: number,
  originalHeight: number
) => (index: number) =>
  down && index === originalIndex
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
        shadow: 1,
        immediate: (n: string) => false
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
  players: Player[];
  addPlayer: (name: string) => void;
  removePlayer: (id: number) => void;
}

export default function PlayerList({
  players,
  addPlayer,
  removePlayer
}: IProps) {
  const classes = useStyles();
  const order = useRef<number[]>([]);
  const itemsRef = useRef<HTMLElement[]>([]);
  const [items, setItems] = useState<Player[]>(players);
  const [listHeight, setListHeight] = useState<number>(0);

  useEffect(() => {
    setItems(players);

    const idxs = players.map((_, index) => index);

    order.current = [...order.current, ...idxs.slice(order.current.length)];
    console.log(order.current);
    itemsRef.current = new Array(players.length);
  }, [players]);

  const [springs, setSprings] = useSprings(
    items.length,
    fn(order.current, false, 0, 0, 0, 0)
  );

  useLayoutEffect(() => {
    if (itemsRef.current.length) {
      setSprings(
        // @ts-ignore
        fn(order.current, false, 0, 0, 0, itemsRef.current[0].offsetHeight)
      );

      setListHeight(itemsRef.current[0].offsetHeight * itemsRef.current.length);
    }
  }, [itemsRef, setSprings]);

  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const target = itemsRef.current[originalIndex];
    const targetHeight = target.offsetHeight;
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * targetHeight + y) / targetHeight),
      0,
      items.length - 1
    );
    const newOrder = move(order.current, curIndex, curRow);

    const newFn = fn(newOrder, down, originalIndex, curIndex, y, targetHeight);
    // @ts-ignore
    setSprings(newFn); // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder;
  });

  return (
    <div>
      <List className={classes.list} style={{ height: listHeight }}>
        {springs.map(({ zIndex, shadow, y, scale }, i) => (
          <animated.div
            ref={el => (itemsRef.current[i] = el!)}
            {...bind(i)}
            key={i}
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
              <PlayerListItem player={items[i]} removePlayer={removePlayer} />
            }
          />
        ))}
      </List>
      <PlayerForm addPlayer={addPlayer} />
    </div>
  );
}
