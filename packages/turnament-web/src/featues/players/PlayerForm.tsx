import { TextField, Button, Theme } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/styles";

interface IProps {
  addPlayer: (name: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },

    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
);

export default function PlayerForm({ addPlayer }: IProps) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value) return;
    addPlayer(value);
    setValue("");
  };

  return (
    <div className={classes.paper}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          fullWidth
          label="Player name"
          margin="normal"
          variant="outlined"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button
          disabled={value.length === 0}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add New Player
        </Button>
      </form>
    </div>
  );
}
