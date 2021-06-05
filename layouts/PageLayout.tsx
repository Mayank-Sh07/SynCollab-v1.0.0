import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { LayoutProps, TabRoutes } from "@/types/local";
import {
  createStyles,
  makeStyles,
  Theme,
  fade,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Link from "@/components/Link";

import HomeIcon from "@material-ui/icons/Home";
import PricingIcon from "@material-ui/icons/Style";
import AboutIcon from "@material-ui/icons/EmojiObjects";
import LinkedIn from "@material-ui/icons/LinkedIn";
import Instagram from "@material-ui/icons/Instagram";
import NotificationModal from "@/components/NotificationModal";
import { useUser } from "@/supabase/authentication";

const UserAvatar = dynamic(() => import("@/components/UserAvatar"), {
  ssr: false,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
      paddingBottom: theme.spacing(8),
      background: "inherit",
      [theme.breakpoints.only("xs")]: {
        paddingBottom: theme.spacing(4),
      },
    },
    page: {
      backgroundColor: "transparent",
      minHeight: "100vh",
    },
    appBar: {
      backgroundColor: theme.palette.primary.dark,
      paddingBottom: theme.spacing(1),
      WebkitBoxShadow: "0 2px 4px -3px black",
      boxShadow: "0 2px 4px -3px black",
    },
    toolBar: {
      minHeight: 64,
      paddingTop: theme.spacing(2),
      [theme.breakpoints.only("xs")]: {
        paddingRight: 0,
      },
    },
    logoLabel: {
      fontWeight: 700,
      marginLeft: "12px",
      [theme.breakpoints.only("xs")]: {
        display: "none",
      },
    },
    menuButton: {
      marginRight: theme.spacing(1),
      backgroundColor: fade(theme.palette.secondary.main, 0.125),
    },
    spacer: {
      flexGrow: 1,
    },
    tabSection: {
      marginRight: theme.spacing(2),
    },
    tab: {
      [theme.breakpoints.up("sm")]: {
        minWidth: theme.spacing(8),
        padding: 0,
      },
    },
    footer: {
      marginTop: theme.spacing(6),
    },
    footerTitle: {
      fontWeight: 700,
      marginLeft: theme.spacing(1),
      flexGrow: 1,
    },
    footerItem: {
      marginRight: theme.spacing(2),
    },
    copyrightContainer: {
      justifyContent: "space-between",
      [theme.breakpoints.only("xs")]: {
        justifyContent: "center",
        padding: theme.spacing(2),
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

function HideOnScroll(props: LayoutProps): React.ReactElement {
  const { children, window } = props;
  const trigger: boolean = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function PageLayout(props: LayoutProps) {
  const classes = useStyles();
  const { route, push: routeTo } = useRouter();
  const { user } = useUser();
  const [path, setPath] = React.useState(() =>
    TabRoutes.includes(route) ? route : false
  );

  const handleChange = (event: React.ChangeEvent<{}>, newPath: string) => {
    setPath(newPath);
    routeTo(newPath);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} disableGutters className={classes.root}>
        {/* Header */}
        <HideOnScroll {...props}>
          <AppBar className={classes.appBar} elevation={0}>
            <Container>
              <Toolbar className={classes.toolBar}>
                <Image src="/logo.svg" height={42} width={42} />
                <Typography variant="h4" className={classes.logoLabel}>
                  SynCollab
                </Typography>
                <div className={classes.spacer} />
                <Hidden smUp>
                  <Link href="/">
                    <IconButton className={classes.menuButton} size="small">
                      <HomeIcon />
                    </IconButton>
                  </Link>
                  <Link href="/about">
                    <IconButton className={classes.menuButton} size="small">
                      <AboutIcon />
                    </IconButton>
                  </Link>
                  <Link href="/pricing">
                    <IconButton className={classes.menuButton} size="small">
                      <PricingIcon />
                    </IconButton>
                  </Link>
                </Hidden>
                <Hidden xsDown>
                  <Tabs
                    value={path}
                    onChange={handleChange}
                    className={classes.tabSection}
                  >
                    <Tab
                      label="Home"
                      classes={{ root: classes.tab }}
                      value="/"
                    />
                    <Tab
                      label="About"
                      classes={{ root: classes.tab }}
                      value="/about"
                    />
                    <Tab
                      label="Pricing"
                      classes={{ root: classes.tab }}
                      value="/pricing"
                    />
                  </Tabs>
                </Hidden>
                {!!user && <NotificationModal userId={user?.id} />}
                <UserAvatar />
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
        <Toolbar className={classes.toolBar} />
        <Container maxWidth={"md"} component="main" className={classes.page}>
          {props.children}
        </Container>
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Grid container justify="space-between">
            <Grid item>
              <Box display="flex">
                <Image src="/logo.svg" height={36} width={36} />
                <Typography variant="h6" className={classes.footerTitle}>
                  SynCollab
                </Typography>
              </Box>
            </Grid>
            <Grid item style={{ alignSelf: "flex-end" }}>
              <IconButton size={"small"} className={classes.footerItem}>
                <LinkedIn />
              </IconButton>
              <IconButton size={"small"} className={classes.footerItem}>
                <Instagram />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container className={classes.copyrightContainer}>
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                Made by{" "}
                <Link color="secondary" href="#">
                  {" Team 5 "}
                </Link>
                All Rights Reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                <Link
                  href="/"
                  color="textSecondary"
                  className={classes.footerItem}
                >
                  {"Home"}
                </Link>
                <Link
                  href="/about"
                  color="textSecondary"
                  className={classes.footerItem}
                >
                  {"About"}
                </Link>
                <Link
                  href="/pricing"
                  color="textSecondary"
                  className={classes.footerItem}
                >
                  {"Pricing"}
                </Link>
                <Link href="/app" color="textSecondary">
                  {"Application"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
}
