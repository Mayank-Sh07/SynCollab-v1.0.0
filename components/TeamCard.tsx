import React from "react";
import BoxTypography from "./BoxTypography";
import Link from "./Link";
import TeamCodeBox from "./TeamCodeBox";
import UserSearchDialog from "./UserSearchDialog";
import { TeamsData, title3 } from "@/types/local";
import { insertNotification } from "@/utils/functions";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";

import AddIcon from "@material-ui/icons/AddBox";
import LinkIcon from "@material-ui/icons/Launch";
import ObjectivesIcon from "@material-ui/icons/TrackChanges";
import UsersIcon from "@material-ui/icons/People";
import ResultsIcon from "@material-ui/icons/AssistantPhoto";
import SettingsIcon from "@material-ui/icons/SettingsApplications";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    teamCard: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.light,
      borderTop: `10px solid ${theme.palette.secondary.main}`,
      padding: theme.spacing(0, 2, 2),
      margin: "auto",
      marginBottom: theme.spacing(3),
      minWidth: 275,
      maxWidth: 300,
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      height: "2px",
    },
    actions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0px 16px",
    },
    addBtn: {
      borderRadius: "4px",
      padding: "4px",
    },
    chip: {
      borderRadius: "3px",
      fontSize: "14px",
    },
  })
);

export default function TeamCard(props: TeamsData): React.ReactElement {
  const classes = useStyles();
  const baseOrgURL = `/app/${props.orgId}/`;

  const handleReqToJoin = async (event: React.SyntheticEvent) => {
    const isErr = await insertNotification([
      {
        sender_id: props.user.id,
        receiver_id: props.organizations.creator_id,
        oid: props.orgId,
        tid: props.tid,
        type: "REQ_TO_JOIN",
        body: "",
        status: "PENDING",
      },
    ]);

    if (isErr) {
      alert("User already Notified!");
    } else {
      console.log(`Request to join ${props.team_name} sent successfully!`);
    }
  };

  const showQuickAccess = () => {
    if (props.isUserTeam) {
      const userRoleData = props.source.filter(
        (user) => user.uid === props.user.id
      );
      const userRole = userRoleData[0].role;
      if (userRole === "Manager") {
        return (
          <Grid container justify="space-evenly" alignItems="center">
            <Grid item xs={4}>
              <Chip
                variant="default"
                size="small"
                label={userRole}
                className={classes.chip}
              />
            </Grid>
            <Grid item xs={4}>
              <UserSearchDialog
                orgId={props.oid}
                teamId={props.tid}
                uid={props.user.id}
                teamName={props.team_name}
              />
            </Grid>
            <Grid item xs={2}>
              <Link href={baseOrgURL + props.tid + "/" + "settings"}>
                <Tooltip title="Team Settings">
                  <IconButton className={classes.addBtn} size="small">
                    <SettingsIcon style={{ fontSize: 22 }} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid container alignItems="center" justify="space-evenly">
            <Grid item xs={12}>
              <Chip
                variant="default"
                size="small"
                label={userRole}
                className={classes.chip}
              />
            </Grid>
          </Grid>
        );
      }
    }
    return <></>;
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Paper className={classes.teamCard} elevation={5}>
        <BoxTypography {...title3} align="center" ml={1}>
          {props.team_name}
        </BoxTypography>
        <Divider className={classes.divider} />
        <TeamCodeBox code={props.tid} boxProps={{ margin: "-8px 0px 16px" }} />
        <Grid container justify="space-evenly">
          <Grid item container direction="column" xs={2} alignItems="center">
            <Tooltip title="Team Members">
              <UsersIcon />
            </Tooltip>
            <BoxTypography variant="caption" mt={0} mb={2}>
              {props.source.length}
            </BoxTypography>
          </Grid>
          <Grid item container direction="column" xs={2} alignItems="center">
            <Tooltip title="Objectives">
              <ObjectivesIcon />
            </Tooltip>
            <BoxTypography variant="caption" mt={0} mb={2}>
              {props.objectives.length}
            </BoxTypography>
          </Grid>
          <Grid item container direction="column" xs={2} alignItems="center">
            <Tooltip title="Key Results">
              <ResultsIcon />
            </Tooltip>
            <BoxTypography variant="caption" mt={0} mb={2}>
              {!props.objectives || props.objectives.length === 0
                ? "0"
                : props.objectives[0].key_results.length}
            </BoxTypography>
          </Grid>
        </Grid>
        {props.isUserTeam ? (
          <Link href={baseOrgURL + props.tid}>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              startIcon={<LinkIcon />}
              size="small"
            >
              OPEN TEAM
            </Button>
          </Link>
        ) : (
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            startIcon={<AddIcon style={{ marginTop: 2 }} />}
            onClick={handleReqToJoin}
            size="small"
          >
            REQUEST TO JOIN
          </Button>
        )}
        <Divider className={classes.divider} />

        {showQuickAccess()}
      </Paper>
    </Grid>
  );
}
