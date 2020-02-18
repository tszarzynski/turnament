import { List } from "@material-ui/core";
import React from "react";
import PlayerForm from "./PlayerForm";
import PlayerListItem from "./PlayerListItem";
import { Player } from "turnament-scheduler";
import { useTransition, animated } from "react-spring"

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

  const transitions = useTransition(players, player => player.ID, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
  })



  return (
    <div>
      <List>
        {transitions.map(({ item, props, key }) =>
          <animated.div key={key} style={props}>
            <PlayerListItem
              player={item}
              removePlayer={removePlayer}
            />
          </animated.div>)}
      </List>
      <PlayerForm addPlayer={addPlayer} />
    </div>
  );
}
