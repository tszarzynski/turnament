import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/List";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getSchedulerTypesAsList, SchedulerType } from "turnament-scheduler";
import { routes } from "../../app/router";
import PageHeader from "../../components/PageHeader";
import { setSchedulerType } from "../round/roundsSlice";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function SetupPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState<{ schedulerType: SchedulerType }>({
    schedulerType: "ROUND_ROBIN"
  });

  const handleChange = (key: keyof typeof state) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setState({
      ...state,
      [key]: event.target.value as SchedulerType
    });
  };

  const handleNext = () => {
    dispatch(setSchedulerType({ schedulerType: state.schedulerType }));

    routes.players.push();
  };

  const options = getSchedulerTypesAsList().map(option => (
    <FormControlLabel
      key={option}
      value={option}
      control={<Radio />}
      label={option}
    />
  ));

  return (
    <Box component="main" width={1}>
      <div className={classes.paper}>
        <PageHeader labelText="Setup">
          <TitleIcon />
        </PageHeader>
        <div className={classes.form}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Tournament type</FormLabel>
            <RadioGroup
              aria-label="tournament-type"
              name="tournament-type"
              value={state.schedulerType}
              onChange={handleChange("schedulerType")}
            >
              {options}
            </RadioGroup>
          </FormControl>
          <Divider variant="middle" />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </Box>
  );
}
