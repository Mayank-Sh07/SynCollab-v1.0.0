import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { GetServerSideProps } from "next";
import { supabase } from "@/supabase/index";
import OKR from "@/components/OKR";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  let { org_id, team_id }: any = query;
  if (!user || org_id === undefined) {
    return {
      props: {},
      redirect: { destination: "/auth/login", permanent: false },
    };
  }
  const orgId: number = parseInt(org_id);
  const teamId: string = team_id;

  let { data, error } = await supabase
    .from("objectives")
    .select("*,key_results(*)")
    .eq("team_id", teamId);

  return { props: { data, user, orgId } };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        overflowX: "auto",
        width: "100%",
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Safari + Chrome
        },
      },
    },
  })
);

function TeamIndex(props: any) {
  const classes = useStyles();
  const { data } = props;

  return (
    <Container className={classes.container} maxWidth={false}>
      {data?.map((okrData: any) => (
        <OKR data={okrData} />
      ))}
    </Container>
  );
}

TeamIndex.layout = AppLayout;

export default TeamIndex;
