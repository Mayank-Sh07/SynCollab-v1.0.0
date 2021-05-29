import React from "react";
import clsx from "clsx";
import { supabase } from "@/supabase/index";
import { KeyResults } from "@/types/local";
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
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";

import EditIcon from "@material-ui/icons/Edit";
import UpdateIcon from "@material-ui/icons/RateReview";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import ObjectiveIcon from "@material-ui/icons/TrackChanges";
import KeyResutIcon from "@material-ui/icons/AssistantPhoto";
import DateIcon from "@material-ui/icons/DateRange";
import TeamIcon from "@material-ui/icons/People";
import DescriptionIcon from "@material-ui/icons/Sort";
import TypeIcon from "@material-ui/icons/Ballot";
import ProgressIcon from "@material-ui/icons/Assessment";
import InfoIcon from "@material-ui/icons/Info";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { dateFormatRegex } from "@/utils/functions";

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
    typeBtnSelected: {
      backgroundColor: `${theme.palette.secondary.main} !important`,
      color: `${theme.palette.common.white} !important`,
    },
    dateEditBadge: {
      fontSize: 16,
      backgroundColor: "grey",
      padding: 2,
      borderRadius: "16px",
    },
    overdue: {
      backgroundColor: fade(theme.palette.error.main, 0.6),
    },
    due: {
      backgroundColor: fade(theme.palette.info.main, 0.4),
    },
    actionBtn: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  })
);

type OKRType = KeyResults["type"];

interface OKREditDrawerProps extends KeyResults {
  objective: string | undefined;
  teamName: string;
  editable: boolean;
  mutate: any;
}

export default function OKREditDrawer(props: OKREditDrawerProps) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [type, setType] = React.useState<OKRType>(props.type);
  const [DescEditMode, setDescEditMode] = React.useState(false);
  const [description, setDescription] = React.useState(props.key_desc);
  const [DateEditMode, setDateEditMode] = React.useState(false);
  const [date, setDate] = React.useState(
    !props.target_date ? new Date().toISOString() : props.target_date
  );
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

  const getStatusChip = (tar: KeyResults["target_date"]) => {
    if (tar === undefined) {
      return <></>;
    } else if (new Date(date).getTime() >= new Date().getTime()) {
      return (
        <Chip variant="outlined" label="Status: Due" className={classes.due} />
      );
    } else {
      return (
        <Chip
          variant="outlined"
          label="Status: Overdue"
          className={classes.overdue}
        />
      );
    }
  };

  const handleDelete = async (keyId: number) => {
    const { error } = await supabase
      .from("key_results")
      .delete()
      .eq("key_id", keyId);

    if (error) {
      alert(error.message);
    } else {
      setState(false);
      props.mutate();
    }
  };

  const handleEditSubmit = async (data: any) => {
    const edits = { ...data, type, date };
    if (!props.editable) {
      const { error } = await supabase
        .from<KeyResults>("key_results")
        .update({
          progress: edits.currProgress,
        })
        .eq("key_id", props.key_id);

      if (error) {
        alert(error.message);
      } else {
        setState(false);
        props.mutate();
      }
    } else {
      const { error } = await supabase
        .from<KeyResults>("key_results")
        .update({
          target_date: edits.date,
          key_desc: edits.newDescription,
          type: edits.type,
          progress: edits.currProgress,
          max_progress: edits.maxProgress,
        })
        .eq("key_id", props.key_id);

      if (error) {
        alert(error.message);
      } else {
        setState(false);
        props.mutate();
      }
    }
  };

  return (
    <>
      <IconButton size="small" onClick={toggleDrawer}>
        {props.editable ? (
          <Tooltip title="Edit">
            <EditIcon style={{ fontSize: 16 }} />
          </Tooltip>
        ) : (
          <Tooltip title="Update Progress">
            <UpdateIcon style={{ fontSize: 16 }} />
          </Tooltip>
        )}
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
              style={{ fontWeight: 600, maxWidth: 400 }}
            >
              {props.objective}
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
              {props.key_name}
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
                        <Tooltip title="Cancel Changes">
                          <CloseIcon className={classes.dateEditBadge} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Edit Date">
                          <EditIcon className={classes.dateEditBadge} />
                        </Tooltip>
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
                <TextField
                  name="newDate"
                  type="date"
                  size="small"
                  onChange={(e) => {
                    setDate(dateFormatRegex(e.target.value));
                    setDateEditMode(false);
                  }}
                  inputProps={{
                    style: { fontSize: 12 },
                  }}
                />
              ) : (
                <ListItemText
                  primary="Due Date"
                  secondary={date}
                  primaryTypographyProps={{ variant: "body2" }}
                  secondaryTypographyProps={{ variant: "caption" }}
                />
              )}
            </ListItem>
            <ListItem component="div" className={classes.decoratorLI}>
              <ListItemAvatar>
                <Avatar className={clsx(classes.listAvatar, classes.squared)}>
                  <PersonAddIcon style={{ color: "white" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Added By"
                secondary={props.added_by}
                primaryTypographyProps={{ variant: "body2" }}
                secondaryTypographyProps={{
                  variant: "caption",
                  noWrap: true,
                }}
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
                  <Tooltip title="Save Changes">
                    <CheckIcon
                      className={classes.labelIcon}
                      onClick={() => {
                        setDescription(getValues("newDescription"));
                        setDescEditMode(!DescEditMode);
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Edit Description">
                    <EditIcon
                      className={classes.labelIcon}
                      onClick={() => setDescEditMode(!DescEditMode)}
                    />
                  </Tooltip>
                )}
              </div>
            </Box>
            {DescEditMode ? (
              <Controller
                name="newDescription"
                control={control}
                defaultValue={description}
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
            <Box margin={"4px 16px 16px"}>
              <Box display="flex" alignItems="center">
                <TypeIcon className={classes.labelIcon} />
                <Typography
                  variant="overline"
                  color="textSecondary"
                  gutterBottom
                >
                  Type
                </Typography>
              </Box>
              <ButtonGroup variant="contained" color="primary">
                <Button
                  disabled={type === "PER"}
                  onClick={() => setType("PER")}
                  classes={{ disabled: classes.typeBtnSelected }}
                >
                  %
                </Button>
                <Button
                  disabled={type === "NUM"}
                  onClick={() => setType("NUM")}
                  classes={{ disabled: classes.typeBtnSelected }}
                >
                  #
                </Button>
                <Button
                  disabled={type === "CUR"}
                  onClick={() => setType("CUR")}
                  classes={{ disabled: classes.typeBtnSelected }}
                >
                  ₹
                </Button>
                <Button
                  disabled={type === "NAN"}
                  onClick={() => setType("NAN")}
                  classes={{ disabled: classes.typeBtnSelected }}
                >
                  None
                </Button>
              </ButtonGroup>
            </Box>
          )}
          <Box margin={"4px 16px 16px"} hidden={type === "NAN"}>
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
                  defaultValue={props.progress}
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
                  defaultValue={props.max_progress}
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
                      InputLabelProps={{ shrink: true }}
                      disabled={type === "PER" || !props.editable}
                      value={type === "PER" ? "100" : value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box margin={"4px 14px 16px"}>
            <Box display="flex" alignItems="center">
              <InfoIcon className={classes.labelIcon} />
              <Typography variant="overline" color="textSecondary" gutterBottom>
                Info
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" style={{ marginRight: 16 }}>
                <strong style={{ fontWeight: 600 }}>{"Created on: "}</strong>
                {dateFormatRegex(props.added_on)}
              </Typography>
              {getStatusChip(props.target_date)}
            </Box>
          </Box>
          <Box margin={"4px 14px 16px"} display="flex" alignItems="center">
            {props.editable && (
              <Button
                className={classes.actionBtn}
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => handleDelete(props.key_id)}
                startIcon={<DeleteIcon />}
              >
                {"DELETE"}
              </Button>
            )}
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
        </form>
      </Drawer>
    </>
  );
}
