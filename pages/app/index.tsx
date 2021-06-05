import React from "react";
import Image from "next/image";
import Link from "@/components/Link";
import PageLayout from "@/layouts/PageLayout";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { supabase } from "@/supabase/index";
import { useForm, Controller } from "react-hook-form";
import { fetchOganizations, setOrg, truncate } from "@/utils/functions";
import {
  definitions,
  UserOrganization,
  TeamCode,
  AppIndexProps,
  NewOrgData,
} from "@/types/local";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import NameIcon from "@material-ui/icons/ShortText";
import CodeIcon from "@material-ui/icons/LinearScale";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      props: {},
      redirect: { destination: "/auth/login", permanent: false },
    };
  }

  let { data: organizations } = await supabase.rpc<UserOrganization>(
    "get_user_orgs",
    {
      user_id: user.id,
    }
  );

  let { data: profiles } = await supabase
    .from<definitions["profiles"]>("profiles")
    .select("*")
    .eq("uid", user.id);

  const userProfile = profiles === null ? null : profiles[0];

  return { props: { organizations, user, userProfile } };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
      },
    },
    centered: {
      justifyContent: "center",
    },
    pageTitle: {
      fontWeight: 800,
      textAlign: "center",
      marginTop: theme.spacing(6),
    },
    gridContainer: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      backgroundColor: "transparent",
    },
    card: {
      minWidth: 275,
      height: 290,
      border: `1px solid`,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      alignItems: "start",
    },
    actionCard: {
      border: `1px solid ${theme.palette.secondary.light}`,
      minHeight: 680,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
      },
    },
  })
);

function AppIndex(props: AppIndexProps) {
  const classes = useStyles();
  const [status, setStatus] = React.useState({
    open: false,
    success: false,
    message: "",
  });
  const { data: organizations, mutate } = useSWR(
    props.user.id + "_org",
    fetchOganizations,
    { initialData: props.organizations }
  );
  const {
    control: newOrgForm,
    handleSubmit: handleNewOrg,
    reset: resetOrgForm,
  } = useForm({
    mode: "onChange",
    defaultValues: { orgName: "", orgDesc: "" },
  });
  const {
    control: joinTeamForm,
    handleSubmit: handleTeamJoin,
    reset: resetTeamForm,
  } = useForm({
    mode: "onChange",
    defaultValues: { teamCode: "" },
  });

  const createNeworg = async (data: NewOrgData) => {
    const { error } = await supabase
      .from<definitions["organizations"]>("organizations")
      .insert(
        [
          {
            org_name: data.orgName,
            about_org: data.orgDesc,
            creator_id: props.user.id,
          },
        ],
        { returning: "minimal" }
      );

    resetOrgForm();

    if (error) {
      switch (error.code) {
        case "23505":
          setStatus({
            open: true,
            success: false,
            message: `An Organization with name ${data.orgName} already exists! Please provide a unique name to your Organization.`,
          });
          break;

        default:
          setStatus({ open: true, success: false, message: error.message });
          break;
      }
      return;
    }

    setStatus({
      open: true,
      success: true,
      message: "Organization created successfully!",
    });

    mutate();
  };

  const joinTeam = async (data: TeamCode) => {
    const { data: teams, error } = await supabase
      .from("teams")
      .select(
        `
      oid,
      team_name,
      organizations:oid(
        creator_id,
        org_name
      )
      `
      )
      .eq("tid", data.teamCode);

    resetTeamForm();

    if (error || teams === null) {
      console.log(error);
      setStatus({
        open: true,
        success: false,
        message:
          "Unable to find the Team you're looking for. Please re-check the entered team ID.",
      });
      return;
    }

    let recvId = teams[0].organizations.creator_id;
    let orgName = teams[0].organizations.org_name;
    let message = `${props.userProfile.full_name} (${props.userProfile.username}) has requested to join '${teams[0].team_name}' under your organization '${orgName}'.`;

    if (recvId == props.user.id) {
      setStatus({
        open: true,
        success: false,
        message: `Cannot request entry as you are the creator of ${orgName}! You can add yourself to the team via the organization dashboard.`,
      });
      return;
    }

    const { error: notificationError } = await supabase
      .from<definitions["notifications"]>("notifications")
      .insert(
        [
          {
            sender_id: props.user.id,
            receiver_id: recvId,
            tid: data.teamCode,
            oid: teams[0].oid,
            body: message,
            type: "REQ_TO_JOIN",
            status: "PENDING",
          },
        ],
        { returning: "minimal" }
      );

    if (notificationError) {
      console.log(notificationError);
      setStatus({
        open: true,
        success: false,
        message: notificationError.message,
      });
      return;
    }

    setStatus({
      open: true,
      success: true,
      message: `Request has been sent to join ${teams[0].team_name}, The '${orgName}' organization will be visible after the request is accepted.`,
    });

    mutate();
  };

  return (
    <Container maxWidth={"md"} className={classes.container}>
      <Paper
        elevation={0}
        className={classes.paper}
        style={{ backgroundColor: "transparent" }}
      >
        <Typography variant="h3" className={classes.pageTitle} gutterBottom>
          Organizations
        </Typography>
        {!organizations || organizations.length === 0 ? (
          <>
            <Box display="flex" justifyContent="center" mb={2} mt={8}>
              <Image src="/organizations.svg" height={280} width={400} />
            </Box>
            <Typography variant="body1" color="textSecondary" align="center">
              You have no existing Organizations
            </Typography>
          </>
        ) : (
          <Grid
            container
            spacing={4}
            justify="space-evenly"
            className={classes.gridContainer}
          >
            {organizations?.map((org) => (
              <Grid item xs={12} sm={6} md={4} key={org.id}>
                <Card className={classes.card} elevation={4}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      <b>{org.name}</b>
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      <strong>{org.date}</strong>
                    </Typography>
                    <Typography variant="body2" component="p">
                      {truncate(org.about, 180, "...")}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      href={`/app/${org.id}/`}
                      style={{ textDecoration: "none !important" }}
                    >
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={(event) => setOrg(event, org.id, org.name)}
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          left: "8px",
                          width: 260,
                          margin: "auto",
                        }}
                      >
                        Enter Organization
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
      <Paper
        elevation={0}
        className={classes.paper}
        style={{ backgroundColor: "transparent" }}
      >
        <Grid
          container
          spacing={4}
          justify="space-evenly"
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6}>
            <Card
              elevation={2}
              component="form"
              className={classes.actionCard}
              onSubmit={handleNewOrg((data: NewOrgData) => createNeworg(data))}
            >
              <CardContent>
                <Box display="flex" justifyContent="center">
                  <Image src="/neworg.svg" height={200} width={200} />
                </Box>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  align="center"
                  color="secondary"
                >
                  <b>Create Organization</b>
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  paragraph
                  align="center"
                  gutterBottom
                >
                  Start your own organization by providing it a name and a
                  meaningful description.
                </Typography>
                <Box p={2}>
                  <Controller
                    name="orgName"
                    control={newOrgForm}
                    defaultValue=""
                    rules={{
                      required: "Organization name required",
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Organization name"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <NameIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                  <div style={{ margin: "16px 0px" }} />
                  <Controller
                    name="orgDesc"
                    control={newOrgForm}
                    defaultValue=""
                    rules={{
                      required: "Organization description required",
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Organization description"
                        variant="filled"
                        color="secondary"
                        multiline
                        rows={4}
                        fullWidth
                        size="small"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </Box>
              </CardContent>
              <CardActions className={classes.centered}>
                <Button type="submit" color="secondary" variant="contained">
                  Create Organization
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              elevation={2}
              component="form"
              onSubmit={handleTeamJoin((data: TeamCode) => joinTeam(data))}
              className={classes.actionCard}
            >
              <CardContent>
                <Box display="flex" justifyContent="center" mb={2}>
                  <Image src="/jointeam.svg" height={200} width={200} />
                </Box>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  align="center"
                  color="secondary"
                >
                  <b>Join an existing Team</b>
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  paragraph
                  align="center"
                >
                  Enter the 16 character team code of the team you want to join.
                  A notification will be sent to the owner of the Organization
                  for your admittance.
                </Typography>
                <Box p={2}>
                  <Controller
                    name="teamCode"
                    control={joinTeamForm}
                    defaultValue=""
                    rules={{
                      required: "Team code required",
                      pattern: {
                        value:
                          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
                        message: "Invalid team code",
                      },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Team code"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CodeIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </Box>
              </CardContent>
              <CardActions className={classes.centered}>
                <Button type="submit" color="secondary" variant="contained">
                  Join Team
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={status.open}
        autoHideDuration={3000}
        onClose={() => {
          setStatus({ ...status, open: false });
        }}
      >
        {status.success ? (
          <Alert severity="success">
            <AlertTitle>Success!</AlertTitle>
            {status.message}
          </Alert>
        ) : (
          <Alert severity="error">
            <AlertTitle>Error!</AlertTitle>
            Oops! some error has occured, please try again.
            <br />
            <strong>Error Message: </strong>
            {status.message}
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
}

AppIndex.layout = PageLayout;

export default AppIndex;
