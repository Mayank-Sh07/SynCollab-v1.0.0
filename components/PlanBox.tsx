import React from "react";
import Link from "@/components/Link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

import PlansIcon from "@material-ui/icons/AccountBalanceWallet";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    planBoxContainer: {
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(6),
      borderRadius: 2,
      marginTop: theme.spacing(3),
      justifyContent: "space-between",
      [theme.breakpoints.only("xs")]: {
        padding: theme.spacing(3),
        justifyContent: "center",
      },
    },
  })
);

export default function PlanBox(): React.ReactElement {
  const classes = useStyles();
  return (
    <Grid container className={classes.planBoxContainer}>
      <Hidden xsDown>
        <Grid item>
          <Typography variant="h5" component="h2">
            <strong>Don't miss out on SynCollab!</strong>
          </Typography>
        </Grid>
      </Hidden>
      <Grid item>
        <Link href="/pricing">
          <Button variant="contained" startIcon={<PlansIcon />} color="primary">
            Show Plans
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
