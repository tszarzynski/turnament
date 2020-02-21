import React, { ReactNode } from "react";
import { makeStyles, Avatar, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  }
}));

interface Props {
  labelText: string;
  children: ReactNode;
}

export default function PageHeader({ children, labelText }: Props) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={4}>
      <Avatar className={classes.avatar}>{children}</Avatar>
      <Typography component="h1" variant="h5">
        {labelText}
      </Typography>
    </Box>
  );
}
