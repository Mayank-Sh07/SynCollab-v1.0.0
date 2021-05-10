import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { supabase } from "@/supabase/index";
import { GetServerSideProps } from "next";
import {
  definitions,
  OrgIndexPageData,
  OrgIndexPageProps,
} from "@/types/local";
import { dateFormatRegex } from "@/utils/functions";
import { HomePageFeatures } from "@/utils/content";
import AdminCard from "@/components/AdminCard";
import BoxTypography from "@/components/BoxTypography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import LinkIcon from "@material-ui/icons/Launch";

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { user } = await supabase.auth.api.getUserByCookie(ctx.req);
//   let { org_id }: any = ctx.query;
//   if (!user || org_id === undefined) {
//     return {
//       props: {},
//       redirect: { destination: "/auth/login", permanent: false },
//     };
//   }
//   const orgId: number = parseInt(org_id);
//   let { data: organizations, error } = await supabase
//     .from<OrgIndexPageData>("organizations")
//     .select(
//       `
//     org_name,
//     about_org,
//     date_created,
//     managers,
//     profiles:creator_id(
//       username,
//       email,
//       full_name,
//       avatar_url
//     ),
//     source(
//       profiles:uid(
//         username,
//         email
//       ),
//       teams:tid(
//         team_name
//       ),
//       role,
//       inserted_at
//     )
//   `
//     )
//     .eq("oid", orgId);

//   if (error || organizations === null) {
//     return {
//       props: { error: true },
//     };
//   }

//   let {
//     profiles: orgCreatorData,
//     source: rawTableData,
//     ...orgData
//   } = organizations[0];

//   let tableData = rawTableData.map((row) => ({
//     userName: row.profiles.username,
//     email: row.profiles.email,
//     teamName: row.teams.team_name,
//     role: row.role,
//     dateAdded: row.inserted_at,
//   }));

//   let { data: profiles, error: profileFetchError } = await supabase
//     .from<definitions["profiles"]>("profiles")
//     .select("*")
//     .in("uid", orgData.managers);

//   if (profileFetchError) {
//     console.log(profileFetchError.message);
//   } else console.log(profiles);

//   return {
//     props: { orgCreatorData, tableData, orgData },
//   };
// };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainPaper: {
      paddingTop: theme.spacing(4),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    secondaryColour: {
      color: theme.palette.secondary.main,
    },
    dateBox: {
      padding: theme.spacing(1, 2),
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "2px",
      width: "max-content",
      marginLeft: theme.spacing(3),
    },
    sectionTitle: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      fontWeight: 700,
    },
    about: {
      lineHeight: "24px",
      maxWidth: theme.breakpoints.width("sm"),
      padding: theme.spacing(2),
      margin: "auto",
      textAlign: "center",
      // [theme.breakpoints.only("xs")]: {
      // },
    },
    adminCardContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
    },
  })
);

function About(props: OrgIndexPageProps) {
  // const { orgCreatorData, tableData } = props;
  // console.log(orgCreatorData);
  // console.log(tableData);
  // console.log(orgData);
  const classes = useStyles();

  const orgData = {
    creator_id: "ff3ae4da-f558-4bf6-8285-fa0eb0b046ef",
    org_name: "Org one",
    about_org: `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, sit facere. Doloribus dolorum, rem saepe delectus, suscipit dignissimos ipsam necessitatibus iure corporis quas tempore perferendis similique molestiae. Non culpa vero soluta libero, corrupti omnis illum sed ullam. Laboriosam labore voluptatibus soluta quos assumenda, fugiat impedit itaque nulla distinctio eaque cumque!
`,
    date_created: "2021-05-08",
    managers: ["ff3ae4da-f558-4bf6-8285-fa0eb0b046ef"],
  };

  // const orgCreatorData = {
  //   username: "mike",
  //   email: "mike74600@gmail.com",
  //   full_name: "Mayank Sharma",
  //   avatar_url: "https://icotar.com/initials/M.png",
  // };

  const tableData = [
    {
      userName: "mike",
      email: "mike74600@gmail.com",
      teamName: "Team-1",
      role: "Manager",
      dateAdded: "2021-05-08T17:44:34.093461+00:00",
    },
  ];

  const managerData = [
    {
      uid: "ff3ae4da-f558-4bf6-8285-fa0eb0b046ef",
      email: "mike74600@gmail.com",
      username: "mike",
      full_name: "Mayank Sharma",
      avatar_url: "https://icotar.com/initials/M.png",
      updated_at: null,
    },
    {
      uid: "ff3ae4da-f558-4bf6-8285-fa0eb0b046ea",
      email: "mike74600@gmail.com",
      username: "mike123456",
      full_name: "Mayank Sharma",
      avatar_url: "https://icotar.com/initials/M.png",
      updated_at: null,
    },
    {
      uid: "ff3ae4da-f558-4bf6-8285-fa0eb0b046eb",
      email: "mike74600@gmail.com",
      username: "mike2",
      full_name: "Mayank Sharma",
      avatar_url: "https://icotar.com/initials/M.png",
      updated_at: null,
    },
    {
      uid: "ff3ae4da-f558-4bf6-8285-fa0eb0b046ec",
      email: "mike74600@gmail.com",
      username: "mike3",
      full_name: "Mayank Sharma",
      avatar_url: "https://icotar.com/initials/M.png",
      updated_at: null,
    },
    {
      uid: "ff3ae4da-f558-4bf6-8285-fa0eb0b046ed",
      email: "mike74600@gmail.com",
      username: "mike4",
      full_name: "Mayank Sharma",
      avatar_url: "https://icotar.com/initials/M.png",
      updated_at: null,
    },
    {
      uid: "ff3ae4da-f558-4bf6-8285-fa0eb0b046ee",
      email: "mike74600@gmail.com",
      username: "mike5",
      full_name: "Mayank Sharma",
      avatar_url: "https://icotar.com/initials/M.png",
      updated_at: null,
    },
  ];

  return (
    <div>
      <Container>
        <Paper elevation={4} className={classes.mainPaper}>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.dateBox}
          >
            {" Created on "}
            <span className={classes.secondaryColour}>
              {dateFormatRegex(orgData.date_created)}
            </span>
          </Typography>
          {/* <Typography
            align="center"
            variant="h3"
            className={classes.sectionTitle}
          >
            {orgData.org_name}
          </Typography> */}
          <BoxTypography
            align="center"
            variant="h3"
            mt={4}
            mb={2}
            fontWeight={700}
          >
            {orgData.org_name}
          </BoxTypography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.about}
          >
            {orgData.about_org}
          </Typography>
          <Typography
            align="center"
            variant="h4"
            className={classes.sectionTitle}
          >
            Administrators
          </Typography>
          <Container maxWidth={"md"} className={classes.adminCardContainer}>
            <Grid container justify="space-evenly" spacing={4}>
              {managerData.map((admin) => (
                <AdminCard {...admin} />
              ))}
            </Grid>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}

About.layout = AppLayout;

export default About;
