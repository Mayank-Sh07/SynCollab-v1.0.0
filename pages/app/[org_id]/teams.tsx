import React from "react";
import { supabase } from "@/supabase/index";
import { dateFormatRegex, getNavData } from "@/utils/functions";
import { useForm, Controller } from "react-hook-form";
// Components
import AppLayout from "@/layouts/AppLayout";
import BoxTypography from "@/components/BoxTypography";
import TeamCard from "@/components/TeamCard";
import TeamCodeBox from "@/components/TeamCodeBox";
// Types and Content
import { GetServerSideProps } from "next";
import { TeamsProps, TeamsData, title1, error1 } from "@/types/local";
// Material-UI Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";

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
    .from<TeamsData>("teams")
    .select(`*,organizations:oid(creator_id),source(role)`)
    .eq("oid", orgId);

  const { data: orgmanagersArray } = await supabase
    .from("organizations")
    .select("managers")
    .eq("oid", orgId);

  if (error || !orgmanagersArray) {
    console.log(error?.message);
    return {
      props: {},
      redirect: { destination: "/auth/login", permanent: false },
    };
  }
  let fetchError: boolean = Boolean(error);

  let isManager = orgmanagersArray[0].managers.includes(user.id);

  const UserTeams = await getNavData(orgId, user.id);

  return { props: { Teams, UserTeams, orgId, user, isManager, fetchError } };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageActions: {
      display: "flex",
      justifyContent: "flex-end",
    },
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
    teamsContainer: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(6),
      [theme.breakpoints.up("sm")]: {
        padding: 0,
      },
    },
    teamIdContainer: {
      maxWidth: 240,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(3, 1, 2),
      margin: "auto",
    },
  })
);

function Teams(props: TeamsProps) {
  const classes = useStyles();
  const { Teams, UserTeams, orgId, user, isManager, fetchError } = props;
  const { control, handleSubmit, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [newTeamId, setTeamId] = React.useState(undefined);
  const userTeamIdArray = UserTeams?.map((team) => team.id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAdded(false);
    setTeamId(undefined);
    reset();
  };

  if (fetchError) {
    return (
      <BoxTypography {...error1} color="error">
        Unable to Fetch data, Please re-load page.
      </BoxTypography>
    );
  }

  return (
    <div>
      <Container>
        <div className={classes.pageActions}>
          {isManager && (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              color="secondary"
              onClick={handleClickOpen}
            >
              Add Team
            </Button>
          )}
        </div>
        <Paper elevation={6} className={classes.mainPaper}>
          <BoxTypography {...title1}>{"Teams"}</BoxTypography>
          <Container className={classes.teamsContainer} maxWidth={"md"}>
            <Grid container justify="space-evenly" spacing={2}>
              {Teams?.map((team) => (
                <TeamCard
                  key={team.tid}
                  {...team}
                  date_created={dateFormatRegex(team.date_created)}
                  isUserTeam={Boolean(userTeamIdArray?.includes(team.tid))}
                  orgId={orgId}
                  user={user}
                  isManager={isManager}
                />
              ))}
            </Grid>
          </Container>
        </Paper>
      </Container>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(async (data) => {
            const { data: newteam, error } = await supabase
              .from("teams")
              .insert([{ team_name: data.teamName, oid: orgId }]);

            if (error) {
              console.log(error);
            } else {
              !!newteam && setTeamId(newteam[0]?.tid);
              setAdded(true);
            }
          }),
        }}
      >
        <DialogTitle>{"Add New Team"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a Team in jiffy. You name it, you got it!
          </DialogContentText>
          <Controller
            name="teamName"
            control={control}
            defaultValue=""
            rules={{
              required: "Team name required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Team Name"
                variant="outlined"
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
          {added && (
            <>
              <BoxTypography mt={1} variant="caption" color="textSecondary">
                New Team ID
              </BoxTypography>
              <TeamCodeBox code={newTeamId} boxProps={{ marginTop: 2 }} />
            </>
          )}
        </DialogContent>
        {added ? (
          <DialogActions>
            <Button
              onClick={handleClose}
              color="secondary"
              startIcon={<CancelIcon />}
            >
              Close
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button
              onClick={handleClose}
              color="secondary"
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button type="submit" color="secondary" startIcon={<AddIcon />}>
              Create
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

Teams.layout = AppLayout;

export default Teams;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
