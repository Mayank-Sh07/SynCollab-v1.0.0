import React from "react";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";
import { supabase } from "../supabase";
import { Profiles } from "@/types/local";
import { makeStyles, Theme, useTheme, fade } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import UsernameIcon from "@material-ui/icons/AccountBox";
import MailIcon from "@material-ui/icons/Mail";
import CloseIcon from "@material-ui/icons/Close";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface ProfileProps {
  userName: string;
  children?: React.ReactNode;
  editable?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    height: "auto",
    maxHeight: 540,
  },
  dialogEditable: {
    height: 540,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: theme.breakpoints.width("xs"),
  },
  tabs: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  tab: {
    minWidth: 120,
  },
  tabIndicator: {
    display: "none",
  },
  labelIcon: {
    minHeight: 54,
  },
  tabSelected: {
    backgroundColor: fade(theme.palette.secondary.dark, 0.2),
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  tabIcon: {
    marginRight: theme.spacing(1),
    fontSize: "22px",
    marginBottom: "0px !important",
  },
  contentWrapper: {
    flexDirection: "row",
  },
  actionContainer: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Profile(props: ProfileProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [userData, setUserData] = React.useState<Profiles | null>(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    async function getData() {
      let { data, error } = await supabase
        .from<Profiles>("profiles")
        .select("*")
        .eq("username", props.userName);
      if (error) {
        console.log(error.message);
      } else {
        return data;
      }
    }

    getData().then((data) => {
      !!data && setUserData(data[0]);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <>
      <div onClick={handleClickOpen} style={{ width: "100%" }}>
        {props.children}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          square: true,
          className: clsx({
            [classes.dialog]: !Boolean(props.editable),
            [classes.dialogEditable]: Boolean(props.editable),
          }),
        }}
        maxWidth="xs"
        className={classes.dialog}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="16px 16px 16px 32px"
        >
          <Typography variant={!!props.editable ? "h6" : "h5"}>
            Profile
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {!props.editable && <Divider color="secondary" />}
        <DialogContent>
          {
            <div className={classes.root}>
              {props.editable && (
                <AppBar position="static" color="inherit" elevation={0}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    classes={{ indicator: classes.tabIndicator }}
                    className={classes.tabs}
                    variant="fullWidth"
                  >
                    <Tab
                      label="Profile"
                      classes={{
                        root: classes.tab,
                        selected: classes.tabSelected,
                        wrapper: classes.contentWrapper,
                        labelIcon: classes.labelIcon,
                      }}
                      icon={<PersonIcon className={classes.tabIcon} />}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label="Edit"
                      classes={{
                        root: classes.tab,
                        selected: classes.tabSelected,
                        wrapper: classes.contentWrapper,
                        labelIcon: classes.labelIcon,
                      }}
                      icon={<EditIcon className={classes.tabIcon} />}
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </AppBar>
              )}
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0}>
                  <List component="ul">
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${value + 1}`}
                          src={userData?.avatar_url}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Full Name"}
                        secondary={userData?.full_name}
                        primaryTypographyProps={{ variant: "body2" }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <UsernameIcon style={{ fontSize: 26 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Username"
                        secondary={userData?.username}
                        primaryTypographyProps={{ variant: "body2" }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MailIcon style={{ fontSize: 26 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={userData?.email}
                        primaryTypographyProps={{ variant: "body2" }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                  </List>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  Edit TextFields Here.
                </TabPanel>
              </SwipeableViews>
            </div>
          }
        </DialogContent>
      </Dialog>
    </>
  );
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return <div>{value === index && <Box p={1}>{children}</Box>}</div>;
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
