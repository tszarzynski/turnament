import { TableCell, withStyles } from "@material-ui/core";

export const StyledTableCell = withStyles({
  root: {
    paddingRight: 1,
    paddingLeft: 1
  }
})(TableCell);
