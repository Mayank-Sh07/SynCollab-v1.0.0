import React from "react";
import clsx from "clsx";
import DateFnsUtils from "@date-io/date-fns";
import { supabase } from "@/supabase/index";
import { Objectives } from "@/types/local";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
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
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Badge from "@material-ui/core/Badge";

import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import ObjectiveIcon from "@material-ui/icons/TrackChanges";
import DateIcon from "@material-ui/icons/DateRange";
import TeamIcon from "@material-ui/icons/People";
import DescriptionIcon from "@material-ui/icons/Sort";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

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
      fontSize: 30,
      margin: "1px 8px 0px 0px",
      backgroundColor: fade(theme.palette.common.white, 0.06),
      padding: "4px",
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

    dateEditBadge: {
      fontSize: 16,
      backgroundColor: "grey",
      padding: 2,
      borderRadius: "16px",
    },
    actionBtn: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  })
);

interface OKREditDrawerProps extends Objectives {
  teamName: string;
  editable: boolean;
  mutate: any;
}

export default function EditObjective(props: OKREditDrawerProps) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [DescEditMode, setDescEditMode] = React.useState(false);
  const [description, setDescription] = React.useState(props.obj_desc);
  const [DateEditMode, setDateEditMode] = React.useState(false);
  const [date, setDate] = React.useState(() => {
    if (!props.target_date) {
      return new Date();
    }
    return new Date(props.target_date);
  });
  const { control, handleSubmit, getValues } = useForm();

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

  const handleDelete = async (event: any) => {
    const { error } = await supabase
      .from("objectives")
      .delete()
      .eq("obj_id", props.obj_id);

    if (error) {
      alert(error.message);
    } else {
      props.mutate();
      setState(false);
    }
  };

  const handleEditSubmit = async (data: any) => {
    const edits = { ...data, date };
    const { error } = await supabase
      .from<Objectives>("objectives")
      .update({
        obj_desc: edits.newDescription,
        target_date: edits.date.toLocaleDateString(),
      })
      .eq("obj_id", props.obj_id);

    if (error) {
      alert(error.message);
    } else {
      props.mutate();
      setState(false);
    }
  };

  return (
    <>
      {props.editable && (
        <IconButton
          size="small"
          style={{ marginTop: 8 }}
          onClick={toggleDrawer}
        >
          <EditIcon style={{ fontSize: 22 }} />
        </IconButton>
      )}
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
              variant="body1"
              noWrap
              color="inherit"
              style={{ fontWeight: 600 }}
            >
              {props.obj_name}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.flex}>
            <ListItem component="div" className={classes.decoratorLI}>
              <ListItemAvatar>
                {props.editable ? (
                  <Badge
                    overlap="rectangle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      DateEditMode ? (
                        <CloseIcon className={classes.dateEditBadge} />
                      ) : (
                        <EditIcon className={classes.dateEditBadge} />
                      )
                    }
                    onClick={() => {
                      DateEditMode
                        ? setDateEditMode(false)
                        : setDateEditMode(true);
                    }}
                  >
                    <Avatar
                      className={clsx(classes.listAvatar, classes.squared)}
                    >
                      <DateIcon style={{ color: "white" }} />
                    </Avatar>
                  </Badge>
                ) : (
                  <Avatar className={clsx(classes.listAvatar, classes.squared)}>
                    <DateIcon style={{ color: "white" }} />
                  </Avatar>
                )}
              </ListItemAvatar>
              {DateEditMode ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    label="new date"
                    value={date}
                    variant="inline"
                    size="small"
                    autoOk
                    invalidDateMessage={""}
                    onChange={(date) => {
                      !!date && setDate(new Date(date.toLocaleString()));
                    }}
                    onAccept={() => setDateEditMode(false)}
                  />
                </MuiPickersUtilsProvider>
              ) : (
                <ListItemText
                  primary="Due Date"
                  secondary={date.toLocaleDateString()}
                  primaryTypographyProps={{ variant: "body2" }}
                  secondaryTypographyProps={{ variant: "caption" }}
                />
              )}
            </ListItem>
            <ListItem component="div" className={classes.decoratorLI}>
              <ListItemAvatar>
                <Avatar className={clsx(classes.listAvatar, classes.squared)}>
                  <TeamIcon style={{ color: "white" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Team"
                secondary={props.teamName}
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
          onSubmit={handleSubmit((data: any) => handleEditSubmit(data))}
        >
          <Box margin={"4px 16px 16px"}>
            <Box display="flex" alignItems="center" width={"100%"}>
              <DescriptionIcon style={{ fontSize: 22, marginRight: "4px" }} />
              <Typography variant="overline" color="textSecondary">
                {DescEditMode ? "Edit Description" : "Description"}
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <div hidden={!props.editable}>
                {DescEditMode ? (
                  <CloseIcon
                    className={classes.labelIcon}
                    onClick={() => {
                      setDescription(getValues("newDescription"));
                      setDescEditMode(!DescEditMode);
                    }}
                  />
                ) : (
                  <EditIcon
                    className={classes.labelIcon}
                    onClick={() => setDescEditMode(!DescEditMode)}
                  />
                )}
              </div>
            </Box>
            {DescEditMode ? (
              <Controller
                name="newDescription"
                control={control}
                defaultValue={description}
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
                    label=" New Description"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    fullWidth
                    multiline
                    rows={4}
                    autoFocus
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            ) : (
              <Typography variant="caption" gutterBottom>
                {description}
              </Typography>
            )}
          </Box>

          {props.editable && (
            <Box margin={"4px 14px 16px"} display="flex" alignItems="center">
              <Button
                className={classes.actionBtn}
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
              >
                {"DELETE"}
              </Button>
              <Button
                className={classes.actionBtn}
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<SaveIcon />}
              >
                {"SAVE CHANGES"}
              </Button>
            </Box>
          )}
        </form>
      </Drawer>
    </>
  );
}
