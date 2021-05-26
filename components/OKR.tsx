import React from "react";
import { supabase } from "../supabase";
import { KeyResults, NewOKR, OKRProps } from "@/types/local";
import { useForm, Controller } from "react-hook-form";
import { dateFormatRegex } from "@/utils/functions";
import Loader from "./Loader";
import EditObjective from "./EditObjective";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import DateIcon from "@material-ui/icons/DateRange";
import ObjectiveIcon from "@material-ui/icons/TrackChanges";
import KeyResutIcon from "@material-ui/icons/AssistantPhoto";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Close";
import OKREditDrawer from "./OKREditDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      marginBottom: theme.spacing(5),
      minWidth: theme.breakpoints.width("md"),
    },
    OIcon: {
      fontSize: 28,
      margin: "5px 12px 0px 4px",
    },
    KRIcon: {
      fontSize: 24,
      margin: "5px 12px 0px 4px",
    },
    addIcon: {
      color: theme.palette.text.secondary,
      fontSize: 24,
      margin: "5px 12px 0px 4px",
    },
    objTitle: {
      fontWeight: 600,
    },
    dateChip: {
      backgroundColor: "inherit",
      display: "flex",
      alignItems: "center",
    },
    addKeyLI: {
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(7),
      backgroundColor: fade(theme.palette.common.white, 0.06),
    },
  })
);

export default function OKR(props: OKRProps) {
  const classes = useStyles();
  const { data, userRole, teamName } = props;
  const { key_results, ...objcetive } = data;
  const [addClicked, setAddClicked] = React.useState(false);
  const { control, handleSubmit } = useForm();
  //   const data: OKRData = {
  //     obj_id: 1,
  //     team_id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  //     created_on: "23-05-2021",
  //     obj_name: "Completion of Objectives page and Team page.",
  //     target_date: "25-05-2021",
  //     keyResults: [
  //       {
  //         key_id: 1,
  //         objective_id: 1,
  //         added_on: "23-05-2021",
  //         key_desc:
  //           "Adding the sidebox and new pages for editing, creating and deleting OKRs",
  //         key_name: "Add CRUD operations",
  //         max_progress: 4,
  //         progress: 0,
  //         target_date: "25-05-2021",
  //         type: "NUM",
  //         status: "DUE",
  //       },
  //       {
  //         key_id: 2,
  //         objective_id: 1,
  //         added_on: "24-05-2021",
  //         key_desc: "Adding new page for editing of OKRs",
  //         key_name: "Edit Page creation",
  //         max_progress: 100,
  //         progress: 0,
  //         target_date: "25-05-2021",
  //         type: "PER",
  //         status: "DUE",
  //       },
  //     ],
  //   };

  //   const x = [
  //     {
  //       obj_id: 1,
  //       team_id: "61344cbc-a1e3-4456-bb82-d6de56eea2d8",
  //       target_date: "2021-05-25",
  //       created_on: "2021-05-23",
  //       obj_name: "Creation of a new world, zytopia.",
  //       key_results: [
  //         {
  //           key_id: 1,
  //           key_name: "Finding atleast 10 humans to occupy the land of Zytopia.",
  //           type: "NUM",
  //           progress: 0,
  //           max_progress: 10,
  //           key_desc:
  //             "To use platforms such as Facebook for aliends and Instagram for monke to find inhabitants for the new world of Zytopia.",
  //           target_date: "2021-05-24",
  //           added_on: "2021-05-23",
  //           status: "DUE",
  //           objective_id: 1,
  //         },
  //         {
  //           key_id: 2,
  //           key_name: "Construction of Zytopian HQ",
  //           type: "PER",
  //           progress: 0,
  //           max_progress: 100,
  //           key_desc:
  //             "The Zytopian HQ is being constructed by the leading universal architects from all over xenopus. This is crucial!",
  //           target_date: "2021-05-25",
  //           added_on: "2021-05-23",
  //           status: "DUE",
  //           objective_id: 1,
  //         },
  //       ],
  //     },
  //   ];

  const progress = (
    curr: KeyResults["progress"],
    max: KeyResults["max_progress"],
    type: KeyResults["type"]
  ): string => {
    switch (type) {
      case "CUR":
        return "₹" + curr + " / ₹" + max;
      case "NUM":
        return curr + " / " + max;
      case "PER":
        return curr + "% / " + max + "%";
      default:
        return "----";
    }
  };

  const handleClick = (event: React.SyntheticEvent) => {
    setAddClicked(!addClicked);
  };

  const addNewKeyResult = async (data: NewOKR) => {
    const { error } = await supabase.from<KeyResults>("key_results").insert([
      {
        key_name: data.keyName,
        target_date: data.date,
        objective_id: props.data.obj_id,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      props.mutate();
      setAddClicked(false);
    }
  };

  if (!data) {
    return (
      <Box width={"100%"} height={200}>
        <Loader isLocal={true} />
      </Box>
    );
  }

  return (
    <List className={classes.list}>
      <ListItem id="OKR-HEAD-OBJECTIVE">
        <Grid container>
          <Grid item xs={9}>
            <Box
              maxWidth={786}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <ObjectiveIcon className={classes.OIcon} />
              <Typography noWrap className={classes.objTitle}>
                {data.obj_name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Chip
                icon={<DateIcon style={{ fontSize: 24, marginTop: 2 }} />}
                label={
                  !data.target_date ? "----" : dateFormatRegex(data.target_date)
                }
                className={classes.dateChip}
              />
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              {!props.viewOnly && (
                <EditObjective
                  {...objcetive}
                  teamName={props.teamName}
                  editable={userRole === "Manager"}
                  mutate={props.mutate}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </ListItem>
      <Divider component="li" style={{ marginLeft: 62 }} />
      {data.key_results.map((keyResult) => (
        <React.Fragment key={"kr-list-item-key-" + keyResult.key_id}>
          <ListItem style={{ paddingLeft: 64 }}>
            <Grid item container>
              <Grid item xs={8}>
                <Box
                  maxWidth={700}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <KeyResutIcon className={classes.KRIcon} />
                  <Typography variant="body2" noWrap>
                    {keyResult.key_name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box
                  maxWidth={700}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" noWrap>
                    {progress(
                      keyResult.progress,
                      keyResult.max_progress,
                      keyResult.type
                    )}
                  </Typography>
                  <Chip
                    icon={<DateIcon style={{ fontSize: 18, marginTop: 4 }} />}
                    label={
                      !keyResult.target_date
                        ? "----"
                        : dateFormatRegex(keyResult.target_date)
                    }
                    className={classes.dateChip}
                  />
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  {!props.viewOnly && (
                    <OKREditDrawer
                      {...{
                        objective: data.obj_name,
                        teamName,
                        ...keyResult,
                      }}
                      editable={userRole === "Manager"}
                      mutate={props.mutate}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </ListItem>
          <Divider
            light
            component="li"
            variant="inset"
            style={{ marginLeft: 104 }}
          />
        </React.Fragment>
      ))}
      {addClicked ? (
        <ListItem className={classes.addKeyLI}>
          <Grid
            item
            container
            component="form"
            onSubmit={handleSubmit((data: NewOKR) => addNewKeyResult(data))}
          >
            <Grid item xs={6}>
              <Controller
                name="keyName"
                control={control}
                rules={{
                  required: "Description required",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Description"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    fullWidth
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddBoxIcon style={{ fontSize: 22, marginTop: 2 }} />
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
            <Grid item xs={1} />
            <Grid item xs={2}>
              <Controller
                name="date"
                control={control}
                rules={{
                  required: "date required",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Deadline"
                    variant="outlined"
                    size="small"
                    color="secondary"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveIcon />}
                  size="small"
                  type="submit"
                >
                  SAVE
                </Button>
                <IconButton
                  size="small"
                  style={{ margin: "4px 0px 0px 16px" }}
                  onClick={handleClick}
                >
                  <CancelIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </ListItem>
      ) : (
        <ListItem style={{ paddingLeft: 64 }} button onClick={handleClick}>
          <Grid item container>
            <Grid item xs={8}>
              <Box
                maxWidth={700}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <AddBoxIcon className={classes.addIcon} />
                <Typography variant="body2" color="textSecondary" noWrap>
                  Add Key result
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </ListItem>
      )}
    </List>
  );
}
