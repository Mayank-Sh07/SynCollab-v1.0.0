import React from "react";
import Link from "@/components/Link";
import { GetServerSideProps } from "next";
import { supabase } from "@/supabase/index";
import { definitions } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";

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

interface Organization {
  id: number;
  name: string;
  about: string;
  date: Date;
}

interface Props {
  organizations: Organization[] | null;
  user: User;
  userProfile: definitions["profiles"];
}

interface OrgData {
  orgName: string;
  orgDesc: string;
}

interface TeamCode {
  teamCode: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      props: {},
      redirect: { destination: "/auth/login", permanent: false },
    };
  }

  let { data: organizations, error } = await supabase.rpc<Organization>(
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
    },
    gridContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    card: {
      minWidth: 275,
      border: `1px solid`,
    },
    actionCard: {
      minWidth: 275,
      border: `1px solid`,
      padding: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
      },
    },
  })
);

async function fetchOganizations(userId: string) {
  let { data: organizations } = await supabase.rpc<Organization>(
    "get_user_orgs",
    {
      user_id: userId,
    }
  );
  return organizations;
}

function AppIndex(props: Props) {
  const classes = useStyles();
  const [status, setStatus] = React.useState({
    open: false,
    success: false,
    message: "",
  });
  const { data: organizations, mutate } = useSWR(
    props.user.id,
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

  const createNeworg = async (data: OrgData) => {
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
      <Paper elevation={0} className={classes.paper}>
        <Typography variant="h3" className={classes.pageTitle} gutterBottom>
          Organizations
        </Typography>
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
                    {org.about}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href="#" style={{ textDecoration: "none !important" }}>
                    <Button size="small" color="secondary">
                      Enter Organization
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Paper elevation={0} className={classes.paper}>
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
              onSubmit={handleNewOrg((data: OrgData) => createNeworg(data))}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  align="center"
                >
                  <b>
                    <u>Create an Organization</u>
                  </b>
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
                        fullWidth
                        autoFocus
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
                        multiline
                        rows={2}
                        fullWidth
                        autoFocus
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
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  align="center"
                >
                  <b>
                    <u>Join an existing Team</u>
                  </b>
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
                        value: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
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
                        fullWidth
                        autoFocus
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
        autoHideDuration={14000}
        onClose={() => {
          setStatus({ open: false, success: false, message: "" });
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

export default AppIndex;
