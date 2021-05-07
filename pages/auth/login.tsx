import { useState } from "react";
import Image from "next/image";
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
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

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
    image: {
      display: "flex",
      justifyContent: "center",
      transform: "translateY(-10px)",
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
  })
);

export default function LoginPage() {
  const classes = useStyles();
  const router = useRouter();
  const [status, setStatus] = useState({ open: false, success: false });
  const { control, handleSubmit, reset } = useForm({
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
    router.push("/app");
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={4}>
        <Link href="/">
          <IconButton color="secondary">
            <BackIcon />
          </IconButton>
        </Link>
        <Container maxWidth="sm" className={classes.image}>
          <Image src="/login.svg" height={200} width={200} />
        </Container>
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
                        color="secondary"
                        fullWidth
                        autoFocus
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon />
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
                        color="secondary"
                        fullWidth
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
                    {"Don't have an account? "}
                    <Link href="/auth/signup" color="secondary">
                      {"Create one"}
                    </Link>
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
