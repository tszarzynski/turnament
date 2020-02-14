import React, { ReactNode } from "react";
import { makeStyles, Avatar, Typography } from "@material-ui/core";

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
  }
}));

interface Props {
  labelText: string;
  children: ReactNode;
}

export default function PageHeader({ children, labelText }: Props) {
  const classes = useStyles();
  return (
    <>
      <Avatar className={classes.avatar}>{children}</Avatar>
      <Typography component="h1" variant="h5">
        {labelText}
      </Typography>
    </>
  );
}
