import React from "react";
import { supabase } from "@/supabase/index";
import { Objectives, Source, TeamIndexProps } from "@/types/local";
import { useForm, Controller } from "react-hook-form";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import AddIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    formBox: {
      maxWidth: theme.breakpoints.width("sm"),
      padding: theme.spacing(1, 2),
      "& > *": {
        margin: theme.spacing(2, 0),
      },
    },
  })
);

interface AddOKRDialogProps {
  teamName: string;
  teamId: string;
}

export default function AddOKRDialog(props: AddOKRDialogProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, reset } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleAdd = async (data: any) => {
    const { error } = await supabase
      .from<Objectives>("objectives")
      .insert([
        {
          team_id: props.teamId,
          obj_name: data.objectiveName,
          target_date: data.date,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      handleClose();
    }
  };

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        className={classes.fab}
        onClick={handleClickOpen}
      >
        <AddIcon className={classes.extendedIcon} />
        ADD OBJECTIVE
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit((data: any) => handleAdd(data)),
        }}
      >
        <DialogTitle>{"Add a new OKR to " + props.teamName}</DialogTitle>
        <Box className={classes.formBox}>
          <Controller
            name="objectiveName"
            control={control}
            rules={{
              required: "Objective required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Enter Objective"
                variant="filled"
                autoComplete="email"
                color="secondary"
                fullWidth
                multiline
                rows={4}
                autoFocus
                size="small"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            rules={{
              required: "date required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Deadline"
                variant="outlined"
                size="small"
                color="secondary"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </Box>
        <DialogActions>
          <Button onClick={handleClose} variant={"outlined"} color="secondary">
            Cancel
          </Button>
          <Button
            variant={"contained"}
            color="secondary"
            autoFocus
            type="submit"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
