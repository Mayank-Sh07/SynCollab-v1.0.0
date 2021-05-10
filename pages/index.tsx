import React from "react";
// Components
import PageLayout from "@/layouts/PageLayout";
import Link from "@/components/Link";
import Image from "@/components/Image";
import BoxTypography from "@/components/BoxTypography";
import FeatureCard from "@/components/FeatureCard";
import PlanBox from "@/components/PlanBox";
// Types and Content
import { title1, subtitle1 } from "@/types/local";
import { HomePageFeatures } from "@/utils/content";
// Material-UI Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// Material-UI Icons
import StartIcon from "@material-ui/icons/NextWeek";
import GithubIcon from "@material-ui/icons/GitHub";

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
    buttonBox: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(4),
    },
    callToAction: {
      margin: theme.spacing(1),
      borderRadius: 2,
      padding: theme.spacing(1, 3),
    },
    cardContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
    },
  })
);

function Index() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Image src="/teams.svg" height={420} width={480} />
      <BoxTypography {...title1}>
        Build Collaborative Teams with
        <strong className={classes.secondaryColor}> SynCollab</strong>
      </BoxTypography>
      <BoxTypography {...subtitle1} maxWidth={768} m={"auto"}>
        A platform for building strong, transparent and collaborative teams by
        setting Objectives and tracking progress via measurable Key Results.
      </BoxTypography>
      <div className={classes.buttonBox}>
        <Link href="/app">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<StartIcon />}
            className={classes.callToAction}
          >
            Get Started
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GithubIcon />}
          className={classes.callToAction}
        >
          Github
        </Button>
      </div>
      <Container className={classes.cardContainer}>
        <Grid container justify="space-evenly" spacing={4}>
          {HomePageFeatures.map((feature) => (
            <FeatureCard {...feature} />
          ))}
        </Grid>
      </Container>
      <PlanBox />
    </div>
  );
}

Index.layout = PageLayout;

export default Index;

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
