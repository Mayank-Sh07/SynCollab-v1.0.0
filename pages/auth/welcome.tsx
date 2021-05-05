import React from "react";
import { useRouter } from "next/router";
import { supabase } from "@/supabase/index";
import { useUser } from "@/supabase/authentication";
import { definitions } from "@/types/supabase";
import { GetServerSideProps } from "next";
import { useForm, Controller } from "react-hook-form";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Loader from "@/components/Loader";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import NameIcon from "@material-ui/icons/PersonPin";
import UsernameIcon from "@material-ui/icons/AlternateEmail";

export const getServerSideProps: GetServerSideProps = async () => {
  let { data: profiles } = await supabase.from("profiles").select("username");

  const userNames: string[] =
    profiles === null ? [""] : profiles?.map((profile) => profile.username);

  return { props: { userNames } };
};

interface ProfileData {
  fullName: string;
  userName: string;
}

interface Props {
  userNames: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      [theme.breakpoints.only("xs")]: {
        padding: theme.spacing(1),
      },
    },
    centered: {
      textAlign: "center",
    },
    flexCentered: {
      display: "flex",
      justifyContent: "center",
    },
    sidePadded: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    pageTitle: {
      fontWeight: 800,
    },
  })
);

export default function WelcomePage(props: Props) {
  const classes = useStyles();
  const router = useRouter();
  const { userNames } = props;
  const { user } = useUser();
  const [status, setStatus] = React.useState({ open: false, success: false });
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: { fullName: "", userName: "" },
  });

  const updateProfile = async (data: ProfileData): Promise<void> => {
    const { error } = await supabase
      .from<definitions["profiles"]>("profiles")
      .insert([
        {
          uid: user?.id,
          email: user?.email,
          username: data.userName,
          full_name: data.fullName,
          avatar_url: `https://icotar.com/initials/${data.fullName.charAt(
            0
          )}.png`,
        },
      ]);
    if (error) {
      console.log(error);
      setStatus({ open: true, success: false });
      return;
    }
    setStatus({ open: true, success: true });
    router.push("/app");
  };

  if (user === undefined) {
    return <Loader isLocal={false} />;
  }

  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper className={classes.paper} elevation={2}>
        <Typography
          variant="h3"
          className={clsx(classes.pageTitle, classes.centered)}
          gutterBottom
        >
          Welcome
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              className={clsx(classes.paper, classes.sidePadded)}
              elevation={0}
              component="form"
              onSubmit={handleSubmit((data: ProfileData) =>
                updateProfile(data)
              )}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Full name required",
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        autoFocus
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
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="userName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Username required",
                      minLength: {
                        value: 4,
                        message: "Must have 4 or more characters",
                      },
                      validate: (value) =>
                        !userNames.includes(value) || "Username already taken",
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <UsernameIcon />
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
                </Grid>
                <Grid item className={classes.centered} xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={status.open}
        autoHideDuration={5500}
        onClose={() => {
          setStatus({ open: false, success: false });
        }}
      >
        {!status.success ? (
          <Alert severity="error">
            <AlertTitle>Oops!</AlertTitle>
            SynCollab couldn't update your profile, Please try again.
          </Alert>
        ) : (
          <Alert severity="success">
            <AlertTitle>Profile Updated!</AlertTitle>
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
}
