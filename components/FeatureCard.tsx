import React from "react";
import { FeatureCardProps, title3, subtitle2 } from "@/types/local";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import BoxTypography from "@/components/BoxTypography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    featureCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      minWidth: 240,
      maxWidth: 275,
    },
    featureAvatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      height: 64,
      width: 64,
    },
  })
);

export default function FeatureCard(
  props: FeatureCardProps
): React.ReactElement {
  const classes = useStyles();
  const { icon, title, description } = props;
  return (
    <Grid item xs={12} sm={6} md={4} key={title}>
      <div className={classes.featureCard}>
        <Avatar className={classes.featureAvatar}>{icon}</Avatar>
        <BoxTypography {...title3}>{title}</BoxTypography>
        <BoxTypography {...subtitle2} mt={0}>
          {description}
        </BoxTypography>
      </div>
    </Grid>
  );
}
