import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { GetServerSideProps } from "next";
import { supabase } from "@/supabase/index";
import { Source, TeamIndexProps } from "@/types/local";
import Loader from "@/components/Loader";
import OKR from "@/components/OKR";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import AddIcon from "@material-ui/icons/AddCircle";
import AddOKRDialog from "@/components/AddOKRDialog";

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

  let { data: teams, error } = await supabase
    .from("teams")
    .select(`*,objectives(*,key_results(*))`)
    .eq("tid", teamId);

  let { data: source, error: roleFetchError } = await supabase
    .from("source")
    .select("role")
    .match({ uid: user.id, tid: teamId });
  let role: Source["role"] = "Observer";
  if (!roleFetchError && !!source) {
    role = source.length === 0 ? "Observer" : source[0].role;
  }
  if (error || !teams || teams?.length === 0) {
    console.log(error?.message);
    return { props: {} };
  }
  return { props: { teams: teams[0], role } };
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

function TeamIndex(props: TeamIndexProps) {
  const classes = useStyles();
  const { teams, role } = props;

  if (!teams) {
    return <Loader isLocal={false} />;
  }

  return (
    <Container className={classes.container} maxWidth={false}>
      {teams.objectives.map((okrData) => (
        <OKR
          data={okrData}
          userRole={role}
          teamName={teams.team_name}
          key={okrData.obj_id}
        />
      ))}
      <AddOKRDialog teamName={teams.team_name} teamId={teams.tid} />
    </Container>
  );
}

TeamIndex.layout = AppLayout;

export default TeamIndex;
