import React from "react";
import clsx from "clsx";
// Material-UI Core
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import BoxTypography from "./BoxTypography";

import MessageIcon from "@material-ui/icons/Message";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    notificationContainer: {
      marginTop: theme.spacing(2),
      overflow: "hidden",
    },
    bodyContainer: {
      padding: theme.spacing(0, 0, 2, 2),
    },
    flexContainer: {
      display: "flex",
      alignItems: "center",
      "& > *": {
        marginRight: "4px",
      },
    },
    typeIcon: {
      fontSize: 18,
      marginTop: "2px",
      marginRight: "8px",
    },
    avatarContainer: {
      marginTop: theme.spacing(4),
      display: "flex",
      justifyContent: "center",
    },
    avatar: {
      height: 44,
      width: 44,
    },
    expand: {
      fontSize: 14,
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    actionContainer: {
      backgroundColor: theme.palette.primary.main,
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      padding: theme.spacing(1, 2),
      "& > *": {
        marginRight: "4px",
      },
    },
  })
);

export default function Notification() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth="xs">
      <Paper square elevation={6} className={classes.notificationContainer}>
        <Grid container spacing={0} className={classes.bodyContainer}>
          <Grid item xs={10}>
            <Grid container direction="column">
              <Grid item xs={12} className={classes.flexContainer}>
                <MessageIcon className={classes.typeIcon} color="secondary" />
                <BoxTypography color="secondary" variant="caption" pb="6px">
                  Message
                </BoxTypography>
                <BoxTypography color="textSecondary" fontSize={12}>
                  • 11-05-2021
                </BoxTypography>
                <ExpandMoreIcon
                  onClick={handleExpandClick}
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <BoxTypography variant="caption" ml={"2px"} fontWeight={500}>
                  Justin Timberlake
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </BoxTypography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} className={classes.avatarContainer}>
            <Avatar alt="M" className={classes.avatar} />
          </Grid>
        </Grid>
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
      </Paper>
    </Container>
  );
}
