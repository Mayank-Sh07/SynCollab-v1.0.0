import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/supabase/index";
import { UserCredentials } from "@supabase/supabase-js";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import Link from "@/components/Link";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import Lock from "@material-ui/icons/LockOutlined";
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/VpnKey";
import BackIcon from "@material-ui/icons/KeyboardBackspaceRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 640,
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
    sidePadded: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    pageTitle: {
      fontWeight: 800,
    },
    formHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(1),
    },
    avatar: {
      height: 48,
      width: 48,
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

export default function SignUpPage() {
  const classes = useStyles();
  const router = useRouter();
  const [status, setStatus] = useState({ open: false, success: false });
  const { control, handleSubmit, watch, reset } = useForm({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const Login = async (data: UserCredentials): Promise<void> => {
    console.log(data);
    let { error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });
    if (error) {
      console.log(error);
      setStatus({ open: true, success: false });
      return;
    }
    router.push("/");
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={0}>
        <Link href="/">
          <IconButton color="secondary">
            <BackIcon />
          </IconButton>
        </Link>
        <Typography
          variant="h3"
          className={clsx(classes.pageTitle, classes.centered)}
          gutterBottom
        >
          Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              className={clsx(classes.paper, classes.sidePadded)}
              elevation={0}
              component="form"
              onSubmit={handleSubmit((data: UserCredentials) => Login(data))}
            >
              <Grid container direction="column" spacing={2}>
                <Grid item className={classes.formHeader}>
                  <Avatar className={classes.avatar}>
                    <Lock />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Email address required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Email Address"
                        variant="outlined"
                        autoComplete="email"
                        fullWidth
                        autoFocus
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          ),
                        }}
                        type="email"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password required",
                      minLength: {
                        value: 8,
                        message: "Must have 8 or more characters",
                      },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Password"
                        variant="outlined"
                        autoComplete="off"
                        fullWidth
                        autoFocus
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PasswordIcon />
                            </InputAdornment>
                          ),
                        }}
                        type="password"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="caption" gutterBottom>
                    Don't have an account?
                    <Link href="/auth/signup"> Create one.</Link>
                  </Typography>
                </Grid>
                <Grid item className={classes.centered}>
                  <Button variant="contained" color="secondary" type="submit">
                    Log In
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
          reset({ email: "", password: "" });
          setStatus({ open: false, success: false });
        }}
      >
        {!status.success ? (
          <Alert severity="error">
            <AlertTitle>Login Failed</AlertTitle>
            Invalid email or password. Don't have an account?{" "}
            <Link color="secondary" href="/auth/sinup">
              Create a new account.
            </Link>
          </Alert>
        ) : (
          <Alert severity="success">
            <AlertTitle>Login Successful</AlertTitle>
            Welcome Back!
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
}
