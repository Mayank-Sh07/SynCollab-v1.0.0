import React from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
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
  subtitle1,
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
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";

import DeleteIcon from "@material-ui/icons/Delete";
import BackIcon from "@material-ui/icons/KeyboardBackspaceRounded";
import LeaveIcon from "@material-ui/icons/ExitToApp";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

interface SourceProfile extends Source {
  profiles: Profiles;
}

interface TeamSettingData extends Teams {
  source: SourceProfile[];
  organizations: { creator_id: string };
}

interface TeamSettingsProps {
  teams: TeamSettingData;
  user: User;
  allowDelete: boolean;
  role: Source["role"];
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
    .select(`*,organizations:oid(creator_id),source(*,profiles(*))`)
    .eq("tid", teamId);

  if (error || !teams || teams?.length === 0) {
    console.log(error?.message);
    return {
      props: {},
      redirect: { destination: "app/" + org_id, permanent: false },
    };
  }
  let { count: teamCount } = await supabase
    .from<Teams>("teams")
    .select("oid", { count: "exact" })
    .eq("oid", org_id);
  const allowDelete: boolean = !teamCount || teamCount <= 1 ? false : true;

  let { data: source, error: roleFetchError } = await supabase
    .from("source")
    .select("role")
    .match({ uid: user.id, tid: teamId });
  let role: Source["role"] = "Observer";
  if (!source || source.length === 0) {
    return {
      props: {},
      redirect: { destination: `/app/${org_id}`, permanent: false },
    };
  }
  role = source[0].role;

  return { props: { teams: teams[0], user, allowDelete, role } };
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
    .select(`*,organizations:oid(creator_id),source(*,profiles(*))`)
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
  const [renameMode, setRenameMode] = React.useState(false);
  const { teams: propTeams, user } = props;
  const { control, handleSubmit } = useForm();
  const { data: team, mutate } = useSWR(propTeams.tid, fetcher, {
    initialData: propTeams,
  });
  const [selectedUsers, setSelectedUsers] = React.useState<
    SelectedUserRecords[] | undefined
  >(() => {
    return team?.source?.map((item) => ({
      ...item.profiles,
      role: item.role,
    }));
  });

  const [changesMade, setChanges] = React.useState<
    (SelectedUserRecords | undefined)[]
  >([]);

  if (!propTeams) {
    return <Loader isLocal={false} />;
  }

  if (!team || !team.source) {
    return <Loader isLocal={false} />;
  }

  if (team.source.length === 0) {
    return <Loader isLocal={false} />;
  }

  React.useEffect(() => {
    const existingData: SelectedUserRecords[] | undefined = team.source?.map(
      (item) => ({
        ...item.profiles,
        role: item.role,
      })
    );
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
    if (userId === user.id) {
      alert(
        "Cannot delete yourself! Consider leaving the team through the Alert below."
      );
      return;
    }
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

  const handleLeave = async (userId: string) => {
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
      router.reload();
    }
  };

  const handleRename = async (data: any) => {
    console.log(data.newTitle);
    const { error } = await supabase
      .from("teams")
      .update({ team_name: data.newTitle })
      .eq("tid", team.tid);
    if (error) {
      console.log(error.message);
      alert("unable to rename Team");
    } else {
      mutate();
      setRenameMode(false);
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
        <div className={classes.flex} style={{ justifyContent: "center" }}>
          {renameMode ? (
            <form
              noValidate
              onSubmit={handleSubmit((data) => handleRename(data))}
              className={classes.flex}
              style={{ justifyContent: "center", marginBottom: "40px" }}
            >
              <Controller
                name="newTitle"
                control={control}
                defaultValue={props.teams.team_name}
                rules={{
                  required: "New name required",
                  minLength: 3,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="New team name"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    fullWidth
                    autoFocus
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
              <IconButton style={{ marginLeft: "12px" }} type="submit">
                <DoneIcon />
              </IconButton>
              <IconButton
                onClick={() => setRenameMode(false)}
                style={{ marginLeft: "12px" }}
              >
                <CloseIcon />
              </IconButton>
            </form>
          ) : (
            <>
              <BoxTypography {...title1} mb={4}>
                {team.team_name}
              </BoxTypography>
              {props.role === "Manager" && (
                <IconButton
                  onClick={() => setRenameMode(true)}
                  style={{ marginLeft: "12px" }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </>
          )}
        </div>
        <Paper className={classes.teamMembersContainer} variant="outlined">
          <BoxTypography {...title2}>Team Collaborators</BoxTypography>
          <UserSearchBar
            setState={setSelectedUsers}
            fetchAll={false}
            initialUserData={selectedUsers}
            teamId={team.tid}
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
            viewOnly={props.role !== "Manager"}
          />
          {props.role === "Manager" && (
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
          )}
          <BoxTypography {...title2} mt={6}>
            Collaborator Roles
          </BoxTypography>
          <BoxTypography {...subtitle1} align="justify">
            <strong style={{ color: "white", fontSize: "24px" }}>
              {"Manager "}
            </strong>
            {`is the most superior role within any Team. The manager has the 
            permissions to add new OKRs, edit all existing OKRs and can also 
            use the user management section above to alter and assign roles to 
            the collabortors within the team.`}
          </BoxTypography>
          <BoxTypography {...subtitle1} align="justify">
            <strong style={{ color: "white", fontSize: "24px" }}>
              {"Member "}
            </strong>
            {`is the role assigned to team members who are primarily contributors,
             This role grants permissions for adding key reults to existing objectives
              and also allows the member to complety edit their own key results. 
              However, members cannot completly alter key results created by fellow 
              members or managers, rather they can only update the progress If they've 
              made any.`}
          </BoxTypography>
          <BoxTypography {...subtitle1} align="justify">
            <strong style={{ color: "white", fontSize: "24px" }}>
              {"Observer "}
            </strong>
            {`is a simple role which allows the collaborator to merely observe 
            the progress within the team. Observers cannot add or update any 
            objective or key results. Their purpose is to keep track of how the 
            team is proceeding towards acheiving its goals.`}
          </BoxTypography>
        </Paper>
        <Container
          maxWidth="sm"
          disableGutters
          style={{ marginBottom: "32px" }}
        >
          <Alert
            severity="warning"
            action={
              <Tooltip title="Leave Team">
                <Button
                  startIcon={<LeaveIcon />}
                  color="inherit"
                  onClick={() => {
                    if (
                      props.teams.organizations.creator_id === user.id &&
                      !props.allowDelete
                    ) {
                      alert(
                        "Organization creator cannot leave the last team of the Organization!"
                      );
                    } else {
                      handleLeave(user.id);
                      router.reload();
                    }
                  }}
                >
                  LEAVE
                </Button>
              </Tooltip>
            }
          >
            <AlertTitle>Leave this Team</AlertTitle>
            {"Would you like to leave this Team? — "}
            <strong>
              {"Clicking the 'LEAVE' button will remove you from " +
                team.team_name +
                ", caution is advised."}
            </strong>
          </Alert>
        </Container>
        {props.allowDelete && props.role === "Manager" && (
          <Container maxWidth="sm" disableGutters>
            <Alert
              severity="error"
              action={
                <Tooltip title="Delete Team">
                  <Button
                    startIcon={<DeleteIcon />}
                    color="inherit"
                    onClick={handleClickOpen}
                  >
                    DELETE
                  </Button>
                </Tooltip>
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
