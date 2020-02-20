import { TextField, Button, Theme } from "@material-ui/core";
import React, { FormEvent, useState, ChangeEvent } from "react";
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
  const [disabled, setDisabled] = useState(value.length === 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value) return;
    addPlayer(value);
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setDisabled(prev => inputValue.length === 0);
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
          onChange={handleChange}
        />
        <Button
          disabled={disabled}
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
