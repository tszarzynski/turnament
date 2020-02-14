import { Button, TableCell, TableRow, TextField } from "@material-ui/core";
import { Match } from "turnament-scheduler";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMatch } from "./roundsSlice";

interface IProps {
  match: Match;
  names: [string, string];
}

export default function RoundListeItem({ match, names }: IProps) {
  const [editing, setEditing] = useState(false);
  const [result1, setResult1] = useState(match.result[0]);
  const [result2, setResult2] = useState(match.result[1]);
  const dispatch = useDispatch();

  const handleSave = () => {
    setEditing(false);

    const matchToUpdate: Match = { ...match, result: [result1, result2] };
    dispatch(updateMatch({ matchToUpdate }));
  };

  return (
    <TableRow>
      {editing ? (
        <>
          <TableCell>
            <TextField
              label={names[0]}
              defaultValue={match.result[0]}
              required
              type="number"
              id="player-score-1"
              autoFocus
              onChange={e => setResult1(parseInt(e.target.value))}
            />
          </TableCell>
          <TableCell>
            <TextField
              label={names[1]}
              defaultValue={match.result[1]}
              required
              type="number"
              id="player-score-2"
              onChange={e => setResult2(parseInt(e.target.value))}
            />
          </TableCell>
          <TableCell align="right">
            <Button onClick={() => handleSave()}>Save</Button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell align="right">
            {names[0] + " (" + match.result[0] + ")"}
          </TableCell>

          <TableCell align="left">
            {"(" + match.result[1] + ") " + names[1]}
          </TableCell>
          <TableCell align="right">
            <Button onClick={() => setEditing(true)}>Update</Button>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
