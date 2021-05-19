import React from "react";
import clsx from "clsx";
import BoxTypography from "./BoxTypography";
import { NotificationProps } from "@/types/local";
import { deleteNotification } from "@/utils/functions";
// Material-UI Core
import {
  createStyles,
  makeStyles,
  Theme,
  fade,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
// Material-UI Icons
import MessageIcon from "@material-ui/icons/Message";
import RequestIcon from "@material-ui/icons/AddAlert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RemoveIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    notificationContainer: {
      maxWidth: 380,
      margin: "auto",
      marginTop: theme.spacing(1),
      overflow: "hidden",
      borderRadius: "4px",
      [theme.breakpoints.only("xs")]: {
        maxWidth: 360,
      },
    },
    bodyContainer: {
      padding: theme.spacing(0, 0, 2, 2),
      marginTop: "4px",
    },
    flexContainer: {
      display: "flex",
      alignItems: "center",
      "& > *": {
        marginRight: "4px",
      },
    },
    messageIcon: {
      fontSize: 18,
      marginTop: "2px",
      marginRight: "8px",
    },
    requestIcon: {
      fontSize: 18,
      margin: "2px 8px 4px 0px",
    },
    avatarContainer: {
      marginTop: theme.spacing(4),
      display: "flex",
    },
    avatar: {
      height: 44,
      width: 44,
    },
    expand: {
      fontSize: 14,
      marginLeft: "2px",
      backgroundColor: fade(theme.palette.primary.main, 0.35),
      color: theme.palette.secondary.light,
      borderRadius: "8px",
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    actionContainer: {
      backgroundColor: fade(theme.palette.primary.main, 0.2),
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      padding: theme.spacing(1, 2),
      "& > *": {
        marginRight: "4px",
      },
    },
    messageColor: {
      color: theme.palette.info.light,
    },
  })
);

export default function Notification(props: NotificationProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [hide, setHidden] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleNotificationDelete = (nid: number) => {
    deleteNotification(nid);
    setHidden(true);
  };

  const NotificationHead = () =>
    props.type === "INFO" ? (
      <>
        <MessageIcon
          className={clsx(classes.messageIcon, classes.messageColor)}
        />
        <BoxTypography
          variant="caption"
          pb="7px"
          className={classes.messageColor}
        >
          Message
        </BoxTypography>
      </>
    ) : (
      <>
        <RequestIcon className={classes.requestIcon} color="secondary" />
        <BoxTypography color="secondary" variant="caption" pb="6px">
          Request
        </BoxTypography>
      </>
    );

  return (
    <Paper
      square
      elevation={6}
      className={classes.notificationContainer}
      hidden={hide}
    >
      <Grid container spacing={0} className={classes.bodyContainer}>
        <Grid item xs={10}>
          <Grid container direction="column">
            <Grid item xs={12} className={classes.flexContainer}>
              <NotificationHead />
              <BoxTypography color="textSecondary" fontSize={12}>
                • {props.date}
              </BoxTypography>
              {props.type === "INFO" ? (
                <Tooltip placement="right" title={"Delete Notification"}>
                  <RemoveIcon
                    onClick={() => handleNotificationDelete(props.nid)}
                    className={clsx(classes.expand, classes.messageColor)}
                  />
                </Tooltip>
              ) : (
                <Tooltip
                  placement="right"
                  title={expanded ? "Hide Actions" : "Show Actions"}
                >
                  <ExpandMoreIcon
                    onClick={handleExpandClick}
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                  />
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={12}>
              <BoxTypography variant="caption" ml={"2px"} fontWeight={400}>
                {`${props.fullname} | ${props.username}`}
              </BoxTypography>
            </Grid>
            <Grid item xs={12}>
              <BoxTypography
                variant="caption"
                fontSize={"0.65rem"}
                margin={"0px 2px 2px"}
                lineHeight={1}
                color="textSecondary"
              >
                {props.body}
              </BoxTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} className={classes.avatarContainer}>
          <Avatar src={props.avatarURL} className={classes.avatar} />
        </Grid>
      </Grid>
      {!(props.type === "INFO") && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper square elevation={0} className={classes.actionContainer}>
            <Button color="secondary" size="small">
              ACCEPT
            </Button>
            <Button color="secondary" size="small">
              DECLINE
            </Button>
          </Paper>
        </Collapse>
      )}
    </Paper>
  );
}
