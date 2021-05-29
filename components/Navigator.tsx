import React from "react";
import clsx from "clsx";
import useSWR from "swr";
import { OrgLocalStorage, User, Nav, NavigatorData } from "@/types/local";
import { getNavData } from "@/utils/functions";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { Omit } from "@material-ui/types";
import Drawer, { DrawerProps } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Link from "@/components/Link";
import Tooltip from "@material-ui/core/Tooltip";

import BackIcon from "@material-ui/icons/KeyboardBackspaceRounded";
import OrganizationsIcon from "@material-ui/icons/DynamicFeed";
import AllTeamsIcon from "@material-ui/icons/Category";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import AboutIcon from "@material-ui/icons/EmojiObjects";
import PublishIcon from "@material-ui/icons/Publish";

const styles = (theme: Theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    item: {
      paddingTop: 1,
      paddingBottom: 1,
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover,&:focus": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
      },
    },
    itemCategory: {
      backgroundColor: "#232f3e",
      boxShadow: "0 -1px 0 #404854 inset",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    base: {
      fontSize: 24,
      color: theme.palette.common.white,
      fontWeight: 800,
    },
    itemActiveItem: {
      color: theme.palette.secondary.light,
    },
    itemPrimary: {
      fontSize: "inherit",
    },
    itemIcon: {
      minWidth: "auto",
      marginRight: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
  });

interface NavigatorProps
  extends Omit<DrawerProps, "classes">,
    WithStyles<typeof styles>,
    OrgLocalStorage {
  user: User;
}

function Navigator(props: NavigatorProps) {
  const [selectedItem, setSelectedItem] = React.useState("");
  const { classes, orgId, orgName, user, ...other } = props;
  const { data } = useSWR([orgId, user.id], getNavData);
  const baseOrgURL = `/app/${orgId}/`;
  let userTeams: Nav[] = !!data
    ? data.map((team) => ({
        id: team.name,
        icon: <DnsRoundedIcon />,
        href: baseOrgURL + encodeURIComponent(team.id),
      }))
    : [
        {
          id: "No Teams",
          icon: <DnsRoundedIcon />,
          href: baseOrgURL,
        },
      ];
  const categories: NavigatorData[] = [
    {
      id: orgName,
      children: [
        { id: "About", icon: <AboutIcon />, href: baseOrgURL },
        {
          id: "All Teams",
          icon: <AllTeamsIcon />,
          href: baseOrgURL + "teams",
        },
      ],
    },
    {
      id: "Your Teams",
      children: userTeams,
    },
  ];

  const handleListItemClick = (id: string) => {
    setSelectedItem(id);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <Link href="/">
          <Tooltip title="Back to Home">
            <ListItem
              className={clsx(classes.base, classes.item, classes.itemCategory)}
            >
              <ListItemIcon className={classes.itemIcon}>
                <BackIcon />
              </ListItemIcon>
              SynCollab
            </ListItem>
          </Tooltip>
        </Link>
        <Link href="/app">
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <ListItemIcon className={classes.itemIcon}>
              <OrganizationsIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Switch Organization
            </ListItemText>
          </ListItem>
        </Link>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <div style={{ maxHeight: 270, overflowY: "auto" }}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
              {!children || children.length === 0 ? (
                <ListItem style={{ fontSize: 16, fontWeight: 300 }}>
                  {"No Teams"}
                </ListItem>
              ) : (
                children.map(({ id: childId, icon, href }) => (
                  <Link href={href} key={childId}>
                    <ListItem
                      button
                      classes={{ selected: classes.itemActiveItem }}
                      className={clsx(classes.item)}
                      selected={selectedItem === childId}
                      onClick={() => handleListItemClick(childId)}
                    >
                      <ListItemIcon className={classes.itemIcon}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        classes={{
                          primary: classes.itemPrimary,
                        }}
                      >
                        {childId}
                      </ListItemText>
                    </ListItem>
                  </Link>
                ))
              )}
            </div>
            <Divider className={classes.divider} style={{ marginTop: "8px" }} />
          </React.Fragment>
        ))}
      </List>
      <Link
        href="/pricing"
        style={{
          position: "absolute",
          bottom: "6px",
          display: "flex",
          width: "100%",
          padding: "10px",
        }}
      >
        <Tooltip title="Checkout Plans">
          <Button
            variant="contained"
            color="secondary"
            endIcon={<PublishIcon />}
            fullWidth
          >
            FREE PLAN
          </Button>
        </Tooltip>
      </Link>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
