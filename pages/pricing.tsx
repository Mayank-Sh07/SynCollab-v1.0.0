import React from "react";
import { useRouter } from "next/router";
// Components
import PageLayout from "@/layouts/PageLayout";
import Image from "@/components/Image";
import BoxTypography from "@/components/BoxTypography";
// Types and Content
import { title1, subtitle1 } from "@/types/local";
import { PricingPlans } from "@/utils/content";
// Material-UI Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

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
      letterSpacing: -1,
      [theme.breakpoints.only("xs")]: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
      },
    },
    secondaryColor: {
      color: theme.palette.secondary.main,
      fontWeight: 800,
    },
    plansContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
      [theme.breakpoints.up("sm")]: {
        padding: 0,
      },
    },
    pricingCard: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(4, 3),
      margin: "auto",
      marginBottom: theme.spacing(2),
      minWidth: 260,
      maxWidth: 300,
    },
    cardPricing: {
      display: "flex",
      alignItems: "baseline",
    },
    dollar: {
      alignSelf: "flex-start",
      margin: "0px 4px",
      fontWeight: 600,
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      height: "3px",
    },
    reviewerName: {
      fontWeight: 700,
    },
  })
);

function Pricing() {
  const classes = useStyles();
  const { push: routeTo } = useRouter();
  return (
    <div className={classes.root}>
      <Image src="/pricing.svg" height={460} width={500} />
      <BoxTypography {...title1}>
        <strong className={classes.secondaryColor}>Plans </strong>
        and
        <strong className={classes.secondaryColor}> Pricing</strong>
      </BoxTypography>
      <BoxTypography {...subtitle1} maxWidth={768} m={"auto"}>
        Try out SynCollab for free on the basic plan and upgrade later. No
        credit card required. No obligation. No risk!
      </BoxTypography>
      <Container className={classes.plansContainer}>
        <Grid container justify="space-evenly" spacing={2}>
          {PricingPlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.name}>
              <Paper
                className={classes.pricingCard}
                variant="outlined"
                square
                color="primary"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingRight={1}
                >
                  <Typography variant="h6">
                    <b>{plan.name}</b>
                  </Typography>
                  <Typography variant="body2" color="secondary">
                    {plan.saved}
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <div className={classes.cardPricing}>
                  {plan.price === 0 ? (
                    <Typography component="h2" variant="h3" color="textPrimary">
                      <b>Free</b>
                    </Typography>
                  ) : (
                    <>
                      <Typography className={classes.dollar}>$</Typography>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        <b>{plan.price}</b>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        / mo
                      </Typography>
                    </>
                  )}
                </div>
                <Divider className={classes.divider} />
                <Box paddingLeft="4px" display="flex" flexDirection="column">
                  {plan.features.map((feature: any, indx: number) => (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      key={"fk-" + indx + feature.quantity}
                    >
                      <strong>{feature.quantity} </strong>
                      {feature.metric}
                    </Typography>
                  ))}
                </Box>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => routeTo(plan.redirectTo)}
                  >
                    {plan.buttonText}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

Pricing.layout = PageLayout;

export default Pricing;
