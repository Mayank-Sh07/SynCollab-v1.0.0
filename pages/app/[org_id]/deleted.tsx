import React from "react";
import { supabase } from "@/supabase/index";
// import { dateFormatRegex } from "@/utils/functions";
// Components
import AppLayout from "@/layouts/AppLayout";
import BoxTypography from "@/components/BoxTypography";
// Types and Content
import { GetServerSideProps } from "next";
import { definitions, title1, title2, subtitle1, error1 } from "@/types/local";
// Material-UI Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);
  let { org_id }: any = ctx.query;
  if (!user || org_id === undefined) {
    return {
      props: {},
      redirect: { destination: "/auth/login", permanent: false },
    };
  }
  const orgId: number = parseInt(org_id);

  return {
    props: { error: false },
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainPaper: {
      padding: theme.spacing(4),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      border: `1px solid ${theme.palette.primary.light}`,
      [theme.breakpoints.only("xs")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
      },
      "& > *": {
        marginTop: theme.spacing(6),
      },
    },
    secondaryColour: {
      color: theme.palette.secondary.main,
    },
  })
);

function Notifications() {
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Paper elevation={6} className={classes.mainPaper}>
          Notifications 123
        </Paper>
      </Container>
    </div>
  );
}

Notifications.layout = AppLayout;

export default Notifications;
