import React from "react";
import { useRouter } from "next/router";
import { supabase } from "../supabase";
import useUser from "@/utils/useUser";
import Link from "@/components/Link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";

import LogoIcon from "@material-ui/icons/AccountTreeOutlined";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up("sm")]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
    "@global": {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: "none",
      },
    },
  })
);

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {"Copyright © "}
      <Link color="textPrimary" href="/">
        SynCollab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function PageLayout(props: Props) {
  const classes = useStyles();
  const router = useRouter();
  const { profileData } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const redirectToLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    router.push("/auth/login");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const signOut = (event: React.MouseEvent<HTMLElement>) => {
    supabase.auth.signOut();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Header */}
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <LogoIcon style={{ marginRight: "4px" }} />
            <Typography variant="h6" className={classes.title}>
              SynCollab
            </Typography>
            {profileData === undefined ? (
              <Button color="inherit" onClick={redirectToLogin}>
                Login
              </Button>
            ) : (
              <>
                <Avatar
                  alt={profileData.displayname}
                  src={profileData.avatar_url}
                  onClick={handleMenu}
                />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={signOut}>signout</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {/* Page */}
      <Container maxWidth={false} component="main">
        {props.children}
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="secondary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us"],
  },
  {
    title: "Features",
    description: ["Cool stuff", "Random feature", "Team feature"],
  },
  {
    title: "Resources",
    description: ["Resource", "Resource name", "Final resource"],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];
