import React from "react";
import AppLayout from "@/layouts/AppLayout";
import AddOKRDialog from "@/components/AddOKRDialog";
import Link from "@/components/Link";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { supabase } from "@/supabase/index";
import { Source, TeamIndexProps, TeamOKRData } from "@/types/local";
import Loader from "@/components/Loader";
import OKR from "@/components/OKR";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import SettingsIcon from "@material-ui/icons/Settings";
import Image from "@/components/Image";

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
    return {
      props: {},
      redirect: { destination: `/app/${org_id}`, permanent: false },
    };
  }
  return { props: { teams: teams[0], role, user } };
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
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(3, 4, 2),
      marginBottom: "24px",
      borderBottom: `2px solid ${theme.palette.divider}`,
    },
    title: {
      fontWeight: 700,
    },
  })
);

const fetcher = async (tid: string) => {
  let { data: teams, error } = await supabase
    .from<TeamOKRData>("teams")
    .select(`*,objectives(*,key_results(*))`)
    .eq("tid", tid);

  if (error || !teams || teams?.length === 0) {
    console.log(error?.message);
    return undefined;
  }

  return teams[0];
};

function TeamIndex(props: TeamIndexProps) {
  const classes = useStyles();
  const { teams: propTeams, role } = props;
  if (!propTeams) {
    return <Loader isLocal={false} />;
  }
  const { data: teams, mutate } = useSWR(propTeams.tid, fetcher, {
    initialData: propTeams,
  });
  if (!teams || !teams.objectives) {
    return <Loader isLocal={false} />;
  }

  return (
    <Container className={classes.container} maxWidth={false}>
      <div className={classes.header}>
        <Typography variant="h3" className={classes.title}>
          {teams.team_name}
        </Typography>
        <Link href={`/app/${teams.oid}/${teams.tid}/settings`}>
          <Tooltip title="Team Settings">
            <IconButton style={{ marginTop: "16px" }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
      {teams.objectives.length === 0 || !teams.objectives ? (
        <div style={{ marginTop: "48px" }}>
          <Image src="/nookr.svg" height={340} width={360} />
          <Typography variant="h5" align="center">
            No Objectives
          </Typography>
        </div>
      ) : (
        teams.objectives.map((okrData) => (
          <OKR
            data={okrData}
            userRole={role}
            teamName={teams.team_name}
            key={okrData.obj_id}
            mutate={mutate}
            viewOnly={role === "Observer"}
          />
        ))
      )}
      {role === "Manager" && (
        <AddOKRDialog
          teamName={teams.team_name}
          teamId={teams.tid}
          mutate={mutate}
        />
      )}
    </Container>
  );
}

TeamIndex.layout = AppLayout;

export default TeamIndex;
