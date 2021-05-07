import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "@/components/Link";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import StartIcon from "@material-ui/icons/NextWeek";
import GithubIcon from "@material-ui/icons/GitHub";
import FeatureIcon from "@material-ui/icons/Star";
import SignupIcon from "@material-ui/icons/PersonAdd";

const PageLayout = dynamic(() => import("@/layouts/PageLayout"), {
  ssr: false,
});

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
    buttonBox: {
      display: "flex",
      justifyContent: "center",
      "& > *": {
        margin: theme.spacing(1),
        borderRadius: 2,
        padding: theme.spacing(1, 3),
      },
    },
    cardContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
    },
    featureCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "auto",
      minWidth: 240,
      maxWidth: 275,
    },
    featureAvatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      marginBottom: theme.spacing(1),
      height: 64,
      width: 64,
    },
    signupBoxContainer: {
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(6),
      borderRadius: 2,
      marginTop: theme.spacing(3),
    },
  })
);

const features = [
  {
    icon: <FeatureIcon />,
    title: "Feature1",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea repellendus aspernatur expedita asperiores modi omnis, quos quis error saepe fugiat?",
  },
  {
    icon: <FeatureIcon />,
    title: "Feature2",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea repellendus aspernatur expedita asperiores modi omnis, quos quis error saepe fugiat?",
  },
  {
    icon: <FeatureIcon />,
    title: "Feature3",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea repellendus aspernatur expedita asperiores modi omnis, quos quis error saepe fugiat?",
  },
];

function Index() {
  // React.useEffect(() => {
  //   async function getData() {
  //     let { data: userNames, error } = await supabase
  //       .from("profiles")
  //       .select("username");

  //     console.log(
  //       "userNames: ",
  //       userNames?.map((row) => row.username)
  //     );
  //     if (error) return error;
  //     else return userNames;
  //   }

  //   const data = getData();
  //   console.log(data);
  // }, []);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className={classes.flexCenter}>
        <Image src="/teams.svg" height={400} width={400} />
      </Container>
      <Typography
        variant="h3"
        component="h3"
        align="center"
        className={classes.heroTitle}
      >
        Build Collaborative Teams with
        <strong className={classes.secondaryColor}> SynCollab</strong>
      </Typography>
      <Container maxWidth="sm">
        <Typography align="center" color="textSecondary">
          A platform for building strong, transparent and collaborative teams by
          setting Objectives and tracking progress via measurable Key Results.
        </Typography>
      </Container>
      <Box mt={4} className={classes.buttonBox}>
        <Button variant="contained" color="secondary" startIcon={<StartIcon />}>
          Get Started
        </Button>
        <Button variant="contained" color="primary" startIcon={<GithubIcon />}>
          Github
        </Button>
      </Box>
      <Container className={classes.cardContainer}>
        <Grid container justify="space-evenly" spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={4} id={feature.title}>
              <Box className={classes.featureCard}>
                <Avatar className={classes.featureAvatar}>
                  {feature.icon}
                </Avatar>
                <Typography variant="h6">
                  <strong>{feature.title}</strong>
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  align="justify"
                >
                  {feature.description}
                </Typography>
              </Box>
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

Index.layout = PageLayout;

export default Index;
