import React from "react";
import BoxTypography from "@/components/BoxTypography";
import { ReviewCardProps, title3, subtitle2 } from "@/types/local";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import QuoteIcon from "@material-ui/icons/FormatQuoteRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    reviewCard: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(2, 3, 1),
      margin: "auto",
      minWidth: 260,
      maxWidth: 300,
    },
    quote: {
      fontSize: 42,
      transform: `rotateZ(180deg)`,
      color: theme.palette.secondary.main,
    },
  })
);

export default function ReviewCard(props: ReviewCardProps): React.ReactElement {
  const classes = useStyles();
  const { review, name } = props;
  return (
    <Grid item xs={12} sm={4}>
      <Paper
        className={classes.reviewCard}
        variant="outlined"
        square
        color="primary"
      >
        <QuoteIcon className={classes.quote} />
        <BoxTypography {...subtitle2} align="left">
          {review}
        </BoxTypography>
        <Divider />
        <BoxTypography {...title3} variant="subtitle1" align="left">
          {name}
        </BoxTypography>
      </Paper>
    </Grid>
  );
}
