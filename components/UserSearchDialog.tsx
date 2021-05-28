import React from "react";
import UserRoleList from "./UserRoleList";
import BoxTypography from "./BoxTypography";
import UserSearchBar from "./UserSearchBar";
import { Profiles, SelectedUserRecords } from "@/types/local";
import { insertNotification } from "@/utils/functions";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  fade,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import AddUsersIcon from "@material-ui/icons/GroupAdd";
import CloseIcon from "@material-ui/icons/Close";
import BackIcon from "@material-ui/icons/ChevronLeft";
import NextIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addBtn: {
      borderRadius: "4px",
      padding: "0px 8px",
      fontSize: 16,
    },
    dialog: {
      height: "660px",
      [theme.breakpoints.only("xs")]: {
        height: "100%",
      },
    },
    dialogPaper: {
      minHeight: 340,
      [theme.breakpoints.up("sm")]: {
        minWidth: theme.breakpoints.width("sm"),
      },
    },
    titleAvatar: {
      height: 44,
      width: 44,
      backgroundColor: theme.palette.secondary.main,
    },
    titleSection: {
      display: "flex",
      alignItems: "center",
      padding: "10px 24px",
      backgroundColor: fade("#000000", 0.4),
      marginBottom: "16px",
    },
    titleLabel: {
      marginLeft: "16px",
    },
    closeBtn: {
      borderRadius: "4px",
      padding: "4px",
    },
    stepper: {
      padding: "0px 8px 16px",
      marginTop: theme.spacing(1),
      [theme.breakpoints.only("xs")]: {
        padding: "0px 8px 0px",
      },
    },
    stepBox: {
      margin: theme.spacing(3, "auto"),
    },
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    stepActionBox: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
    },
  })
);

interface UserSearchDialogProps {
  uid: string;
  orgId: number;
  teamId: string;
  teamName: string;
  fullButton?: boolean;
}

function getSteps() {
  return ["Select Users", "Assign Roles"];
}

export default function UserSearchDialog(props: UserSearchDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedUsers, setSelectedUsers] =
    React.useState<SelectedUserRecords[] | undefined>(undefined);
  const steps = getSteps();
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.only("xs"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleAdd = async () => {
    if (!selectedUsers) return;
    const isErr = await insertNotification(
      selectedUsers?.map((user) => ({
        sender_id: props.uid,
        receiver_id: user.uid,
        oid: props.orgId,
        tid: props.teamId,
        type: "REQ_TO_ADD",
        body: "",
        status: "PENDING",
        role: user.role,
      }))
    );

    if (isErr) {
      alert("Error while requesting to join team");
    } else {
      handleClose();
      setSelectedUsers(undefined);
      alert("Notifications have been sent to selected users.");
    }
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <div className={classes.stepBox}>
            <BoxTypography
              variant="body1"
              margin={"0px 2px 12px"}
              align="center"
              color="textSecondary"
            >
              {"Search by username or e-mail"}
            </BoxTypography>
            <UserSearchBar
              setState={setSelectedUsers}
              defaultSelected={selectedUsers}
              fetchAll={true}
              label="Add Users"
              teamId={props.teamId}
            />
          </div>
        );
      case 1:
        return (
          <div className={classes.stepBox}>
            <BoxTypography
              variant="body1"
              margin={"0px 2px 8px"}
              align="center"
              color="textSecondary"
            >
              {!selectedUsers?.length
                ? "No users selected"
                : "Assign roles to each user"}
            </BoxTypography>
            <UserRoleList
              data={selectedUsers}
              setState={setSelectedUsers}
              viewOnly={false}
            />
          </div>
        );

      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div>
      {Boolean(props.fullButton) ? (
        <Button
          color="secondary"
          fullWidth
          variant="outlined"
          startIcon={<AddUsersIcon />}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      ) : (
        <Button
          className={classes.addBtn}
          startIcon={<AddUsersIcon style={{ fontSize: 22 }} />}
          onClick={handleClickOpen}
        >
          Add
        </Button>
      )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        scroll="paper"
        PaperProps={{ className: classes.dialogPaper }}
        className={classes.dialog}
      >
        <div className={classes.titleSection}>
          <Avatar className={classes.titleAvatar}>
            <AddUsersIcon style={{ fontSize: 28 }} />
          </Avatar>
          <BoxTypography
            variant="h5"
            fontWeight={600}
            className={classes.titleLabel}
          >
            {props.teamName}
          </BoxTypography>
          <div
            style={{
              flexGrow: 1,
            }}
          />
          <IconButton
            onClick={handleClose}
            size={"small"}
            className={classes.closeBtn}
          >
            <CloseIcon style={{ fontSize: 22 }} />
          </IconButton>
        </div>
        <DialogContent>
          <div className={classes.root}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              className={classes.stepper}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel color="secondary">{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              <div>
                {getStepContent(activeStep)}
                <div className={classes.stepActionBox}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<BackIcon />}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={selectedUsers?.length === 0}
                    endIcon={
                      activeStep === steps.length - 1 ? undefined : <NextIcon />
                    }
                    startIcon={
                      activeStep === steps.length - 1 ? (
                        <AddUsersIcon />
                      ) : undefined
                    }
                    onClick={
                      activeStep === steps.length - 1 ? handleAdd : handleNext
                    }
                  >
                    {activeStep === steps.length - 1 ? "Add" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
