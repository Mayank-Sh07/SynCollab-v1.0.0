import React from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { OrgLocalStorage, User } from "@/types/local";
import { getNotificationCount } from "@/utils/functions";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";

const UserAvatar = dynamic(() => import("@/components/UserAvatar"), {
  ssr: false,
});

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      minHeight: 64,
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
    link: {
      textDecoration: "none",
      color: lightColor,
      "&:hover": {
        color: theme.palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
  });

interface HeaderProps extends WithStyles<typeof styles>, OrgLocalStorage {
  onDrawerToggle: () => void;
  user: User;
}

function Header(props: HeaderProps) {
  const { classes, onDrawerToggle, orgId, user } = props;
  const { data: notificationCount } = useSWR(user.id, getNotificationCount);
  const n: number = notificationCount === undefined ? 0 : notificationCount;
  const baseOrgURL = `/app/${orgId}/`;

  return (
    <React.Fragment>
      <AppBar color="primary" position="fixed" elevation={0}>
        <Toolbar className={classes.appBar}>
          <Grid container spacing={1} alignItems="center">
            <Hidden lgUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Tooltip
                title={n === 0 ? "Alerts • No alerts" : `Alerts • ${n} alerts`}
              >
                <Link href={baseOrgURL + "notifications"}>
                  <IconButton className={classes.menuButton}>
                    <Badge badgeContent={n} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Manage Organization">
                <Link href={baseOrgURL + "settings"}>
                  <IconButton className={classes.menuButton}>
                    <SettingsIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <UserAvatar />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);
