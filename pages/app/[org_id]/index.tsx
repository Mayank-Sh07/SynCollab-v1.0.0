import React from "react";
import { supabase } from "@/supabase/index";
import { dateFormatRegex } from "@/utils/functions";
// Components
import AppLayout from "@/layouts/AppLayout";
import BoxTypography from "@/components/BoxTypography";
import AdminCard from "@/components/AdminCard";
import Table from "@/components/Table";
// Types and Content
import { GetServerSideProps } from "next";
import {
  GridRowsProp,
  GridColDef,
  GridValueFormatterParams,
} from "@material-ui/data-grid";
import {
  definitions,
  OrgIndexPageData,
  OrgIndexPageProps,
  title1,
  title2,
  subtitle1,
  error1,
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

  let { data: organizations, error } = await supabase
    .from<OrgIndexPageData>("organizations")
    .select(
      `*, source(role, inserted_at, profiles:uid(username,full_name),teams:tid(team_name))`
    )
    .eq("oid", orgId);

  if (error || organizations === null) {
    console.log(error?.message);
    return {
      props: { error: true },
    };
  }

  let { source: rawTableData, ...OrgData } = organizations[0];

  let TableData = rawTableData.map((row, indx) => ({
    id: `dg-row-${indx}`,
    userName: row.profiles.username,
    fullName: row.profiles.full_name,
    teamName: row.teams.team_name,
    role: row.role,
    dateAdded: row.inserted_at,
  }));

  let { data: AdminProfiles, error: profileFetchError } = await supabase
    .from<definitions["profiles"]>("profiles")
    .select("*")
    .in("uid", OrgData.managers);

  if (profileFetchError) {
    console.log(profileFetchError.message);
  }

  return {
    props: { OrgData, TableData, AdminProfiles, error: false },
  };
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
    textJustify: {
      textAlign: "center",
      [theme.breakpoints.only("xs")]: {
        textAlign: "justify",
      },
    },
    adminCardContainer: {
      margin: theme.spacing(4, "auto"),
    },
  })
);

function About(props: OrgIndexPageProps) {
  const classes = useStyles();
  const { OrgData, AdminProfiles, TableData, error } = props;
  const rows: GridRowsProp = TableData;

  return (
    <div>
      <Container>
        <Paper elevation={6} className={classes.mainPaper}>
          <div>
            <BoxTypography {...title1}>{OrgData.org_name}</BoxTypography>
            <BoxTypography
              maxWidth={880}
              margin={"auto"}
              {...subtitle1}
              className={classes.textJustify}
            >
              {OrgData.about_org +
                " This organization was created on " +
                dateFormatRegex(OrgData.date_created)}
            </BoxTypography>
          </div>
          <div>
            <BoxTypography {...title2}>Administrators</BoxTypography>
            <Container maxWidth={"md"} className={classes.adminCardContainer}>
              <Grid container justify="space-evenly" spacing={4}>
                {!!AdminProfiles ? (
                  AdminProfiles.map((admin) => (
                    <AdminCard
                      key={admin.uid}
                      isCreator={admin.uid === OrgData.creator_id}
                      {...admin}
                    />
                  ))
                ) : (
                  <BoxTypography {...error1}>
                    Unable to load data.
                  </BoxTypography>
                )}
              </Grid>
            </Container>
          </div>
          <div>
            <BoxTypography {...title2}>Member Info</BoxTypography>
            <Table
              rows={rows}
              columns={columns}
              containerProps={{ maxWidth: "md" }}
            />
          </div>
        </Paper>
      </Container>
    </div>
  );
}

About.layout = AppLayout;

export default About;

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Name",
    description: "Full Name",
    width: 250,
  },
  {
    field: "userName",
    headerName: "Username",
    description: "SynCollab Username",
    width: 170,
  },
  {
    field: "teamName",
    headerName: "Team",
    description: "Team Name",
    width: 250,
  },
  {
    field: "role",
    headerName: "Role",
    description: "Role in Team",
    width: 150,
  },
  {
    field: "dateAdded",
    headerName: "Added On",
    width: 150,
    valueFormatter: (params: GridValueFormatterParams) =>
      dateFormatRegex(String(params.value).slice(0, 10)),
  },
];
