import { List } from "@material-ui/core";
import React from "react";
import PlayerForm from "./PlayerForm";
import PlayerListItem from "./PlayerListItem";
import { Player } from "turnament-scheduler";

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
  return (
    <div>
      <List>
        {players.map((player, index) => (
          <PlayerListItem
            key={index}
            player={player}
            removePlayer={removePlayer}
          />
        ))}
      </List>
      <PlayerForm addPlayer={addPlayer} />
    </div>
  );
}
