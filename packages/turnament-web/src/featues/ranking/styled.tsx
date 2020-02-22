import { withStyles, TableCell } from "@material-ui/core";
import React from "react";

export const StyledTableCell = withStyles({
  root: {
    paddingRight: 1,
    paddingLeft: 1
  }
})(TableCell);
