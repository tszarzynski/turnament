import { Box, Button, TextField, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import React, { FormEvent, useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
    textField: {
      flexGrow: 1,
      marginRight: theme.spacing(1)
    }
  })
);

interface Props {
  addPlayer: (name: string) => void;
}

export default function PlayerForm({ addPlayer }: Props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addPlayer(name);
    setName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);
  };

  useEffect(() => {
    setDisabled(prev => name.length === 0);
  }, [name]);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Box width={1} display="flex" flexDirection="row">
        <TextField
          className={classes.textField}
          label="Player name"
          autoFocus
          margin="none"
          variant="outlined"
          value={name}
          onChange={handleChange}
        />
        <Button
          disabled={disabled}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </Box>
    </form>
  );
}
