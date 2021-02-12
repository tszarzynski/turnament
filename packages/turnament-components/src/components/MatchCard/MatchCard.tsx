import {
  Box,
  Button,
  Card,
  ClickAwayListener,
  Divider,
  InputBase,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { useState } from 'react';
import { Match } from 'turnament-scheduler';

type StyleProps = {
  isArchived: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: ({ isArchived }: StyleProps) => ({
    display: 'flex',
    flexDirection: 'column',
    background: isArchived
      ? theme.palette.primary.light
      : theme.palette.primary.main,
    paddingLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  }),
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreBox: { display: 'flex', flexDirection: 'row' },
  score: {
    background: 'white',
    color: 'black',
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  scoreInput: {
    textAlign: 'center',
    padding: 0,
  },
}));

type PlayerScoreProps = {
  name: string;
  score: number;
  onChange: (newScore: number) => void;
};

const PlayerScore = ({ name, score, onChange, ...rest }: PlayerScoreProps) => {
  const classes = useStyles(rest);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Box className={classes.row}>
      <Typography variant="body1">{name}</Typography>
      <ClickAwayListener onClickAway={() => setIsEditing(false)}>
        <Box className={classes.scoreBox}>
          {isEditing && (
            <Button onClick={() => onChange(score - 1)}>
              <RemoveIcon />
            </Button>
          )}
          <InputBase
            classes={{ input: classes.scoreInput }}
            className={classes.score}
            type="text"
            value={score}
            inputProps={{
              type: 'text',
              inputMode: 'numeric',
              pattern: '[0-9.]+',
            }}
            onFocus={(e) => {
              e.target.select();
              setIsEditing(true);
            }}
            onChange={(e) => onChange(parseInt(e.target.value))}
          />
          {isEditing && (
            <Button onClick={() => onChange(score + 1)}>
              <AddIcon />
            </Button>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

type MatchCardProps = {
  match: Match;
  names: [string, string];
  isArchived?: boolean;
  onScoreChange: (matchToUpdate: Match) => void;
};

const MatchCard = ({
  names,
  match,
  onScoreChange,
  isArchived = true,
}: MatchCardProps) => {
  const classes = useStyles({ isArchived });

  return (
    <Card className={classes.root}>
      <PlayerScore
        name={names[0]}
        score={match.result[0]}
        onChange={(newScore: number) => {
          const matchToUpdate: Match = {
            ...match,
            result: [newScore, match.result[1]],
          };
          onScoreChange && onScoreChange(matchToUpdate);
        }}
      />
      <Divider />
      <PlayerScore
        name={names[1]}
        score={match.result[1]}
        onChange={(newScore: number) => {
          const matchToUpdate: Match = {
            ...match,
            result: [match.result[0], newScore],
          };
          onScoreChange && onScoreChange(matchToUpdate);
        }}
      />
    </Card>
  );
};

export default MatchCard;
