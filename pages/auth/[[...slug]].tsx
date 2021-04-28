import { useState, useRef } from "react";
import { supabase } from "@/supabase/index";
import { UserCredentials } from "@supabase/supabase-js";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import Link from "@/components/Link";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import AccountTree from "@material-ui/icons/AccountTree";
import Lock from "@material-ui/icons/LockOutlined";
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/VpnKey";
import BackIcon from "@material-ui/icons/KeyboardBackspaceRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: theme.breakpoints.width("md"),
      marginTop: theme.spacing(4),
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
    card: {
      margin: theme.spacing(1, 0, 2),
    },
    cardHeader: {
      paddingBottom: theme.spacing(0),
    },
    cardTitle: {
      transform: `translateY(-4px)`,
      fontWeight: 700,
      fontSize: 24,
    },
    cardContent: {
      marginLeft: theme.spacing(8),
      textAlign: "justify",
      [theme.breakpoints.only("xs")]: {
        margin: theme.spacing(0, 2),
      },
    },
    formHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(2),
    },
    avatar: {
      height: 48,
      width: 48,
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

export default function SignUpPage() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState({
    open: false,
    success: false,
    message: "",
  });
  const { control, handleSubmit, watch, reset } = useForm({
    mode: "onChange",
    defaultValues: { email: "", password: "", confPassword: "" },
  });
  const password = useRef({});
  password.current = watch("password", "");

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };

  const SignUp = async (data: UserCredentials): Promise<void> => {
    console.log(data);
    let { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setStatus({ open: true, success: false, message: error.message });
      return;
    }
    setStatus({ open: true, success: true, message: "" });
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
          Signup
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper} elevation={0}>
              <Card className={classes.card} elevation={0}>
                <CardHeader
                  avatar={<AccountTree />}
                  title={"Title here"}
                  titleTypographyProps={{ className: classes.cardTitle }}
                  className={classes.cardHeader}
                />
                <div className={classes.cardContent}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Similique quidem eius, quam aliquid optio sed labore natus
                  quisquam maiores placeat.
                </div>
              </Card>
              <Card className={classes.card} elevation={0}>
                <CardHeader
                  avatar={<AccountTree />}
                  title={"Title here"}
                  titleTypographyProps={{ className: classes.cardTitle }}
                  className={classes.cardHeader}
                />
                <div className={classes.cardContent}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Similique quidem eius, quam aliquid optio sed labore natus
                  quisquam maiores placeat.
                </div>
              </Card>
              <Card className={classes.card} elevation={0}>
                <CardHeader
                  avatar={<AccountTree />}
                  title={"Title here"}
                  titleTypographyProps={{ className: classes.cardTitle }}
                  className={classes.cardHeader}
                />
                <div className={classes.cardContent}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Similique quidem eius, quam aliquid optio sed labore natus
                  quisquam maiores placeat.
                </div>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              className={clsx(classes.paper, classes.sidePadded)}
              elevation={0}
              component="form"
              onSubmit={handleSubmit((data: UserCredentials) => SignUp(data))}
            >
              <Grid container direction="column" spacing={2}>
                <Grid item className={classes.formHeader}>
                  <Avatar className={classes.avatar}>
                    <Lock />
                  </Avatar>
                  <Typography variant="caption" gutterBottom>
                    <Link href="/auth/login">Login </Link>
                    to SynCollab or Signup below
                  </Typography>
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
                  <Controller
                    name="confPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Re-enter password",
                      validate: (value) =>
                        value === password.current ||
                        "Entered password does not match",
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label="Confirm password"
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
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={handleCheckbox} />
                    }
                    label={
                      <Typography variant="body2" gutterBottom>
                        I agree to the <Link href="/">Terms of useage.</Link>
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item className={classes.centered}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!checked}
                    type="submit"
                  >
                    SIGNUP
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={status.open}
        autoHideDuration={14000}
        onClose={() => {
          reset({ email: "", password: "", confPassword: "" });
          setChecked(false);
          setStatus({ open: false, success: false, message: "" });
        }}
      >
        {status.success ? (
          <Alert severity="success">
            <AlertTitle>Signup Successful!</AlertTitle>
            Please check your registered email address for
            <strong> email verification.</strong>
          </Alert>
        ) : (
          <Alert severity="error">
            <AlertTitle>Signup Failed</AlertTitle>
            Oops! some error has occured, please try again. Error Message:{" "}
            {status.message}
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
}
