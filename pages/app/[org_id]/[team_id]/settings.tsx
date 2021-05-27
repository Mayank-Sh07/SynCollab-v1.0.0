import React from "react";
import { useRouter } from "next/router";
import AppLayout from "@/layouts/AppLayout";
import useSWR from "swr";
import BoxTypography from "@/components/BoxTypography";
import UserRoleList from "@/components/UserRoleList";
import UserSearchBar from "@/components/UserSearchBar";
import UserSearchDialog from "@/components/UserSearchDialog";
import { GetServerSideProps } from "next";
import { supabase } from "@/supabase/index";
import {
  Teams,
  Source,
  User,
  title1,
  title2,
  Profiles,
  SelectedUserRecords,
} from "@/types/local";
import Loader from "@/components/Loader";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import DeleteIcon from "@material-ui/icons/Delete";
import BackIcon from "@material-ui/icons/KeyboardBackspaceRounded";

interface SourceProfile extends Source {
  profiles: Profiles;
}

interface TeamSettingData extends Teams {
  source: SourceProfile[];
}

interface TeamSettingsProps {
  teams: TeamSettingData;
  user: User;
  allowDelete: boolean;
}

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
    .from<TeamSettingData>("teams")
    .select(`*,source(*,profiles(*))`)
    .eq("tid", teamId);

  if (error || !teams || teams?.length === 0) {
    console.log(error?.message);
    return { props: {} };
  }
  let { count: teamCount } = await supabase
    .from<Teams>("teams")
    .select("oid", { count: "exact" })
    .eq("oid", org_id);
  const allowDelete: boolean = !teamCount || teamCount <= 1 ? false : true;
  return { props: { teams: teams[0], user, allowDelete } };
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
    teamMembersContainer: {
      maxWidth: theme.breakpoints.width("sm"),
      margin: "auto",
      padding: theme.spacing(4, 8),
      "& > *": {
        marginBottom: theme.spacing(3),
      },
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        padding: "16px",
      },
    },
    flex: {
      display: "flex",
      alignItems: "center",
    },
  })
);

const fetcher = async (tid: string) => {
  let { data: teams, error } = await supabase
    .from<TeamSettingData>("teams")
    .select(`*,source(*,profiles(*))`)
    .eq("tid", tid);

  if (error || !teams || teams?.length === 0) {
    console.log(error?.message);
    return undefined;
  }

  return teams[0];
};

function TeamSettings(props: TeamSettingsProps) {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { teams: propTeams, user } = props;
  if (!propTeams) {
    return <Loader isLocal={false} />;
  }
  const { data: team, mutate } = useSWR(propTeams.tid, fetcher, {
    initialData: propTeams,
  });
  if (!team) {
    return <Loader isLocal={false} />;
  }

  const [selectedUsers, setSelectedUsers] = React.useState<
    SelectedUserRecords[] | undefined
  >(
    team.source.map((item) => ({
      ...item.profiles,
      role: item.role,
    }))
  );

  const [changesMade, setChanges] = React.useState<
    (SelectedUserRecords | undefined)[]
  >([]);

  React.useEffect(() => {
    const existingData: SelectedUserRecords[] = team.source.map((item) => ({
      ...item.profiles,
      role: item.role,
    }));
    let changes: (SelectedUserRecords | undefined)[] = [];
    if (!!selectedUsers) {
      changes = selectedUsers.map((user) => {
        let indx = existingData.findIndex(
          (existingUser) => user.uid === existingUser.uid
        );
        if (indx < 0) {
          return undefined;
        } else if (existingData[indx].role !== user.role) {
          return user;
        }
      });
    }
    changes = changes.filter((x) => x !== undefined);
    setChanges(changes);
  }, [selectedUsers]);

  const handleChanges = async (event: any) => {
    changesMade.forEach(async (user) => {
      if (!!user) {
        const { error } = await supabase
          .from<Source>("source")
          .update({ role: user.role })
          .match({ uid: user.uid, tid: team.tid });
        if (error) {
          alert(error.message);
        } else {
          setChanges([]);
        }
      }
    });
  };

  const handleDelete = async (userId: string) => {
    const { error } = await supabase
      .from<Source>("source")
      .delete()
      .match({ uid: userId, tid: team.tid });

    if (error) {
      alert(error.message);
    } else {
      mutate();
      setSelectedUsers((prev) => prev?.filter((user) => user.uid !== userId));
    }
  };
  const handleTeamDelete = async () => {
    const { error } = await supabase.from("teams").delete().eq("tid", team.tid);

    if (error) {
      alert("error");
      console.log(error.message);
    } else {
      handleClose();
      router.push({
        pathname: "/app/[org_id]/teams",
        query: { org_id: team.oid },
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container className={classes.container} maxWidth={false}>
        <IconButton
          color="secondary"
          onClick={() => {
            router.back();
          }}
        >
          <BackIcon />
        </IconButton>
        <BoxTypography {...title1} mb={4}>
          {"Manage " + team.team_name}
        </BoxTypography>
        <Paper className={classes.teamMembersContainer} variant="outlined">
          <BoxTypography {...title2}>Team Collaborators</BoxTypography>
          <UserSearchBar
            setState={setSelectedUsers}
            fetchAll={false}
            initialUserData={selectedUsers}
          />
          <UserRoleList
            data={
              !!selectedUsers && selectedUsers.length !== 0
                ? selectedUsers
                : team.source.map((item) => ({
                    ...item.profiles,
                    role: item.role,
                  }))
            }
            setState={setSelectedUsers}
            onDelete={handleDelete}
          />
          <Grid container justify="space-evenly">
            <Grid item xs={5}>
              <UserSearchDialog
                orgId={team.oid}
                teamId={team.tid}
                teamName={team.team_name}
                uid={user.id}
                fullButton={true}
              />
            </Grid>
            <Grid item xs={5}>
              <Button
                variant="contained"
                fullWidth
                disabled={changesMade.length === 0}
                color="secondary"
                onClick={handleChanges}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {props.allowDelete && (
          <Container maxWidth="sm" disableGutters>
            <Alert
              severity="error"
              action={
                <Button
                  startIcon={<DeleteIcon />}
                  color="inherit"
                  onClick={handleClickOpen}
                >
                  DELETE
                </Button>
              }
            >
              <AlertTitle>Danger Zone!</AlertTitle>
              Would you like to delete this Team? —{" "}
              <strong>
                Clicking the 'DELETE' button will permanently delete{" "}
                {team.team_name}, caution is advised.
              </strong>
            </Alert>
          </Container>
        )}
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Action!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All the data of {team.team_name} will be deleted permanently! Are
            you sure you would like to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Disagree
          </Button>
          <Button
            onClick={handleTeamDelete}
            color="secondary"
            variant="contained"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

TeamSettings.layout = AppLayout;

export default TeamSettings;
