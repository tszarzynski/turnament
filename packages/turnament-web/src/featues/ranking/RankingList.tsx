import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import { PlayerWithStats } from "turnament-scheduler";
import React from "react";
import RankingListItem from "./RankingListItem";

interface IProps {
    players: PlayerWithStats[];
    deactivatePlayer: (id: number) => void;
}

export default function RankingList({ players, deactivatePlayer }: IProps) {
    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Wins</TableCell>
                    <TableCell align="right">Points</TableCell>
                    <TableCell align="right">OMV</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {players.map((player, index) => (
                    <RankingListItem
                        key={player.ID}
                        rank={index + 1}
                        player={player}
                        deactivatePlayer={deactivatePlayer}
                    />
                ))}
            </TableBody>
        </Table>
    );
}
