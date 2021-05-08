import React from "react";
import clsx from "clsx";
import PageLayout from "@/layouts/PageLayout";
import Image from "next/image";
import Link from "@/components/Link";
import { AboutPageFeatures, AboutPageReviews } from "@/utils/content";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import SignupIcon from "@material-ui/icons/PersonAdd";
import QuoteIcon from "@material-ui/icons/FormatQuoteRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      minHeight: "100vh",
    },
    flexCenter: {
      display: "flex",
      justifyContent: "center",
    },
    heroTitle: {
      fontWeight: 700,
      marginBottom: theme.spacing(3),
      letterSpacing: -2,
      [theme.breakpoints.only("xs")]: {
        marginBottom: theme.spacing(2),
        letterSpacing: -1,
        padding: theme.spacing(2),
      },
    },
    secondaryColor: {
      color: theme.palette.secondary.main,
      fontWeight: 800,
    },
    featureContainer: {
      //   borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
    },
    featureItem: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(1, 2, 1, 3),
      textAlign: "left",
      [theme.breakpoints.only("xs")]: {
        textAlign: "center",
      },
    },
    featureImage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    rtl: {
      [theme.breakpoints.only("xs")]: {
        flexDirection: "column-reverse",
      },
    },
    reviewContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
      [theme.breakpoints.up("sm")]: {
        padding: 0,
      },
    },
    reviewCard: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(4, 3),
      margin: "auto",
      minWidth: 260,
      maxWidth: 300,
    },
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    reviewerName: {
      fontWeight: 700,
    },
    signupBoxContainer: {
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(6),
      borderRadius: 2,
      marginTop: theme.spacing(3),
    },
  })
);

function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.flexCenter}>
        <Image src="/about.svg" height={460} width={500} />
      </Container>
      <Typography
        variant="h3"
        component="h3"
        align="center"
        className={classes.heroTitle}
      >
        Get to know all about
        <strong className={classes.secondaryColor}> SynCollab</strong>
      </Typography>
      <Container maxWidth="md">
        <Typography align="center" color="textSecondary">
          Built on the foundational belief that Teams must be collaborative,
          transparent and objective-centered. SynCollab empowers organizations
          to align and focus on meaningful objectives using the power of OKRs.
        </Typography>
      </Container>
      {AboutPageFeatures.map((feature) => (
        <Grid
          container
          key={feature.title}
          className={clsx(classes.featureContainer, {
            [classes.rtl]: !feature.ltr,
          })}
        >
          {feature.ltr && (
            <Grid item xs={12} sm={6} className={classes.featureImage}>
              <Image src="/about.svg" height={400} width={400} />
            </Grid>
          )}
          <Grid item xs={12} sm={6} className={classes.featureItem}>
            <Typography variant="subtitle2" color="secondary">
              {feature.subtitle}
            </Typography>
            <Typography variant="h5">
              <strong>{feature.title}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {feature.description}
            </Typography>
          </Grid>
          {!feature.ltr && (
            <Grid item xs={12} sm={6} className={classes.featureImage}>
              <Image src="/about.svg" height={400} width={400} />
            </Grid>
          )}
        </Grid>
      ))}

      <Container className={classes.reviewContainer}>
        <Grid container justify="space-evenly" spacing={2}>
          {AboutPageReviews.map((review) => (
            <Grid item xs={12} sm={4} id={review.reviewer}>
              <Paper
                className={classes.reviewCard}
                variant="outlined"
                square
                color="primary"
              >
                <QuoteIcon />
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  align="left"
                >
                  — {review.review}
                </Typography>
                <Divider className={classes.divider} />
                <Typography
                  variant="subtitle2"
                  className={classes.reviewerName}
                >
                  {review.reviewer}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Grid
        container
        justify="space-between"
        className={classes.signupBoxContainer}
      >
        <Grid item>
          <Typography variant="h5" component="h2">
            <strong>Don't miss out on SynCollab!</strong>
          </Typography>
        </Grid>
        <Grid item>
          <Link href="/auth/signup">
            <Button variant="contained" startIcon={<SignupIcon />}>
              SIGN ME UP
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

About.layout = PageLayout;

export default About;
