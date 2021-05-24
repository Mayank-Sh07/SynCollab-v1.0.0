import React from "react";
import clsx from "clsx";
import { supabase } from "@/supabase/index";
import { useForm, Controller } from "react-hook-form";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import ObjectiveIcon from "@material-ui/icons/TrackChanges";
import KeyResutIcon from "@material-ui/icons/AssistantPhoto";
import DateIcon from "@material-ui/icons/DateRange";
import TeamIcon from "@material-ui/icons/People";
import DescriptionIcon from "@material-ui/icons/Sort";
import TypeIcon from "@material-ui/icons/Ballot";
import ProgressIcon from "@material-ui/icons/Assessment";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      minWidth: 540,
      maxWidth: 550,
      [theme.breakpoints.only("xs")]: {
        minWidth: 340,
        maxWidth: 350,
      },
    },
    header: {
      backgroundColor: fade(theme.palette.common.black, 0.4),
    },
    closeBtn: {
      position: "absolute",
      top: 4,
      right: 4,
    },
    decoratorContainer: {
      backgroundColor: fade(theme.palette.common.black, 0.4),
      [theme.breakpoints.only("xs")]: {
        maxWidth: 300,
      },
      padding: theme.spacing(2),
      [theme.breakpoints.only("xs")]: {
        padding: theme.spacing(1),
      },
    },
    flex: {
      display: "flex",
      alignItems: "center",
    },
    decoratorIcon: {
      color: theme.palette.text.secondary,
      fontSize: 22,
      margin: "1px 8px 0px 0px",
      backgroundColor: fade(theme.palette.common.white, 0.06),
      padding: "2px",
      borderRadius: 2,
    },
    decoratorKeyIcon: {
      fontSize: 28,
      margin: "2px 8px 0px 0px",
      backgroundColor: fade(theme.palette.common.white, 0.06),
      padding: "2px",
      borderRadius: 2,
    },
    squared: {
      borderRadius: 4,
    },
    decoratorLI: {
      marginTop: theme.spacing(2),
      maxWidth: 180,
      padding: "8px 0px",
    },
    listAvatar: {
      height: 44,
      width: 44,
      backgroundColor: fade(theme.palette.common.white, 0.06),
    },
    labelIcon: {
      fontSize: 22,
      margin: "-4px 4px 0px 0px",
    },
  })
);

export default function OKREditDrawer(props: any) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const { control, handleSubmit, reset } = useForm();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  return (
    <>
      <IconButton size="small" style={{ marginTop: 8 }} onClick={toggleDrawer}>
        <EditIcon style={{ fontSize: 16 }} />
      </IconButton>
      <Drawer
        anchor="right"
        open={state}
        PaperProps={{ className: classes.drawerPaper }}
      >
        <IconButton
          onClick={toggleDrawer}
          size="small"
          className={clsx(classes.squared, classes.closeBtn)}
          style={{ margin: "6px 4px 0px 0px" }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container className={classes.decoratorContainer}>
          <Grid item xs={12} className={classes.flex}>
            <ObjectiveIcon className={classes.decoratorIcon} />
            <Typography
              variant="caption"
              noWrap
              color="textSecondary"
              style={{ fontWeight: 600 }}
            >
              Objective statemnent here okay bro wassssaaap
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                height: 14,
                width: 1,
                margin: "2px 8px",
                backgroundColor: "white",
              }}
            />
          </Grid>
          <Grid item xs={12} className={classes.flex}>
            <KeyResutIcon className={classes.decoratorKeyIcon} />
            <Typography variant="body2" noWrap style={{ fontWeight: 600 }}>
              Key Result statemnent here okay bro wassssaaap
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.flex}>
            <ListItem component="div" className={classes.decoratorLI}>
              <ListItemAvatar>
                <Avatar className={clsx(classes.listAvatar, classes.squared)}>
                  <DateIcon style={{ color: "white" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Due Date"
                secondary="Jan 7, 2014"
                primaryTypographyProps={{ variant: "body2" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />
            </ListItem>
            <ListItem component="div" className={classes.decoratorLI}>
              <ListItemAvatar>
                <Avatar className={clsx(classes.listAvatar, classes.squared)}>
                  <TeamIcon style={{ color: "white" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Team"
                secondary="team name here hello bro wazzup mah nigga lolz I am is teh funny"
                primaryTypographyProps={{ variant: "body2" }}
                secondaryTypographyProps={{
                  variant: "caption",
                  noWrap: true,
                }}
              />
            </ListItem>
          </Grid>
        </Grid>
        <form
          noValidate
          onSubmit={handleSubmit((data: any) => console.log(data))}
        >
          <Box margin={"4px 16px 16px"}>
            <Box display="flex" alignItems="center">
              <DescriptionIcon style={{ fontSize: 22, marginRight: "4px" }} />
              <Typography variant="overline" color="textSecondary">
                Description
              </Typography>
            </Box>
            <Typography variant="caption" gutterBottom>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              maxime inventore minima distinctio esse ut rem atque deleniti
              illum praesentium, tempora nisi quos veritatis dolorum. Modi
            </Typography>
          </Box>
          <Box margin={"4px 16px 16px"}>
            <Box display="flex" alignItems="center">
              <TypeIcon className={classes.labelIcon} />
              <Typography variant="overline" color="textSecondary" gutterBottom>
                Type
              </Typography>
            </Box>
            <ButtonGroup variant="contained" color="primary">
              <Button>%</Button>
              <Button>#</Button>
              <Button>₹</Button>
              <Button>None</Button>
            </ButtonGroup>
          </Box>
          <Box margin={"4px 16px 16px"}>
            <Box display="flex" alignItems="center">
              <ProgressIcon className={classes.labelIcon} />
              <Typography variant="overline" color="textSecondary" gutterBottom>
                PROGRESS
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Controller
                  name="currProgress"
                  control={control}
                  rules={
                    {
                      //   required: "Description required",
                    }
                  }
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Current Progress"
                      variant="outlined"
                      size="small"
                      color="secondary"
                      fullWidth
                      autoFocus
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <Controller
                  name="maxProgress"
                  control={control}
                  rules={
                    {
                      //   required: "Description required",
                    }
                  }
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Goal"
                      variant="outlined"
                      size="small"
                      color="secondary"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
        <Box margin={"4px 14px 16px"}>
          <Box display="flex" alignItems="center">
            <InfoIcon className={classes.labelIcon} />
            <Typography variant="overline" color="textSecondary" gutterBottom>
              Info
            </Typography>
          </Box>
          <Chip
            variant="outlined"
            label="Created on 29-12-2020"
            className={classes.squared}
            style={{ marginRight: 16 }}
          />
          <Chip
            variant="outlined"
            label="Status: Pending"
            className={classes.squared}
          />
        </Box>
        <Box margin={"4px 14px 16px"}>
          <Button variant="contained" color="secondary" fullWidth>
            {" SAVE CHANGES"}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
