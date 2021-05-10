import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";
import { FeatureImageCardProps } from "@/types/local";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    item: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(1, 3),
      textAlign: "left",
      [theme.breakpoints.only("xs")]: {
        textAlign: "center",
        padding: theme.spacing(2),
      },
    },
    description: {
      [theme.breakpoints.only("xs")]: {
        textAlign: "justify",
      },
    },
    rtl: {
      [theme.breakpoints.only("xs")]: {
        flexDirection: "column-reverse",
      },
    },
  })
);

export default function FeatureImageCard(
  props: FeatureImageCardProps
): React.ReactElement {
  const classes = useStyles();
  const { ltr, src, header, title, description } = props;
  return (
    <Grid
      container
      key={title}
      className={clsx(classes.container, {
        [classes.rtl]: !ltr,
      })}
    >
      {ltr && (
        <Grid item xs={12} sm={6}>
          <Image src={src} height={400} width={400} />
        </Grid>
      )}
      <Grid item xs={12} sm={6} className={classes.item}>
        <Typography variant="subtitle2" color="secondary">
          {header}
        </Typography>
        <Typography variant="h5">
          <strong>{title}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.description}
        >
          {description}
        </Typography>
      </Grid>
      {!ltr && (
        <Grid item xs={12} sm={6}>
          <Image src={src} height={400} width={400} />
        </Grid>
      )}
    </Grid>
  );
}
