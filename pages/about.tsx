import React from "react";
// Components
import PageLayout from "@/layouts/PageLayout";
import Image from "@/components/Image";
import BoxTypography from "@/components/BoxTypography";
import FeatureImageCard from "@/components/FeatureImageCard";
import ReviewCard from "@/components/ReviewCard";
import PlanBox from "@/components/PlanBox";
// Types and Content
import { title1, subtitle1 } from "@/types/local";
import { AboutPageFeatures, AboutPageReviews } from "@/utils/content";
// Material-UI Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      minHeight: "100vh",
    },
    secondaryColor: {
      color: theme.palette.secondary.main,
      fontWeight: 800,
    },
    reviewContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
      [theme.breakpoints.up("sm")]: {
        padding: 0,
      },
    },
  })
);

function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Image src="/about.svg" height={460} width={500} />
      <BoxTypography {...title1}>
        Get to know
        <strong className={classes.secondaryColor}> SynCollab</strong>
      </BoxTypography>
      <BoxTypography {...subtitle1} maxWidth={840} m={"auto"}>
        Built on the foundational belief that Teams must be collaborative,
        transparent and objective-centered. SynCollab empowers organizations to
        align and focus on meaningful objectives using the power of OKRs.
      </BoxTypography>
      {AboutPageFeatures.map((feature) => (
        <FeatureImageCard {...feature} />
      ))}

      <Container className={classes.reviewContainer}>
        <Grid container justify="space-evenly" spacing={2}>
          {AboutPageReviews.map((review) => (
            <ReviewCard {...review} />
          ))}
        </Grid>
      </Container>
      <PlanBox />
    </div>
  );
}

About.layout = PageLayout;

export default About;
