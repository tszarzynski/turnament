import { Box, Button, FormControlLabel, Switch } from "@material-ui/core";
import React from "react";

interface Props {
  manualSeeding: boolean;
  setManualSeeding: (manualSeeding: boolean) => void;
  disabled: boolean;
  randomize: () => void;
}

export default function PlayerListSettings({
  manualSeeding,
  setManualSeeding,
  randomize,
  disabled
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManualSeeding(event.target.checked);
  };

  const handleRandomize = () => {
    randomize();
  };

  return (
    <Box
      width={1}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      my={1}
    >
      <FormControlLabel
        control={
          <Switch
            checked={manualSeeding}
            onChange={handleChange}
            size="small"
          />
        }
        label="Manual seeding"
      />

      <Button
        variant="outlined"
        size="small"
        disabled={manualSeeding || disabled}
        onClick={handleRandomize}
      >
        Randomize
      </Button>
    </Box>
  );
}
