import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
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

export default function SetupPage() {
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

    routes.players().push();
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
      <PageHeader labelText="Setup">
        <TitleIcon />
      </PageHeader>

      <FormControl component="fieldset">
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
      <Box my={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
