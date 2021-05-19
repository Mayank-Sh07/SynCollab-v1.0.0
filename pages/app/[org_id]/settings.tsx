import React from "react";
import { supabase } from "@/supabase/index";
import { dateFormatRegex } from "@/utils/functions";
// Components
import AppLayout from "@/layouts/AppLayout";
import BoxTypography from "@/components/BoxTypography";
// Types and Content
import { GetServerSideProps } from "next";
import {
  SettingsProps,
  // title1,
  // title2,
  // subtitle1,
  // error1,
} from "@/types/local";
// Material-UI Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
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

  let { data: Teams, error } = await supabase
    .from<SettingsProps>("teams")
    .select(`*,organizations(creator_id)`)
    .eq("oid", orgId);

  let fetchError: boolean = Boolean(error);

  return { props: { Teams, fetchError } };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainPaper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
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

function Settings() {
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Paper elevation={6} className={classes.mainPaper}></Paper>
      </Container>
    </div>
  );
}

Settings.layout = AppLayout;

export default Settings;
