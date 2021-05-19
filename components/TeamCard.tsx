import React from "react";
import BoxTypography from "./BoxTypography";
import Link from "./Link";
import TeamCodeBox from "./TeamCodeBox";
import { TeamsData, title3 } from "@/types/local";
import { insertNotification } from "@/utils/functions";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import AddIcon from "@material-ui/icons/AddBox";
import LinkIcon from "@material-ui/icons/Launch";
import ObjectivesIcon from "@material-ui/icons/Adjust";
import UsersIcon from "@material-ui/icons/People";
import ResultsIcon from "@material-ui/icons/AssistantPhoto";

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
  })
);

export default function TeamCard(props: TeamsData): React.ReactElement {
  const classes = useStyles();
  const baseOrgURL = `/app/${props.orgId}/`;

  const handleReqToJoin = async (event: React.SyntheticEvent) => {
    const isErr = await insertNotification({
      sender_id: props.user.id,
      receiver_id: props.organizations.creator_id,
      oid: props.orgId,
      tid: props.tid,
      type: "REQ_TO_JOIN",
      body: "",
      status: "PENDING",
    });

    if (isErr) {
      console.log("Error while requesting to join team");
    }
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
            <UsersIcon />
            <BoxTypography variant="caption" mt={-1} mb={2}>
              {props.source.length}
            </BoxTypography>
          </Grid>
          <Grid item container direction="column" xs={2} alignItems="center">
            <ObjectivesIcon />
            <BoxTypography variant="caption" mt={-1} mb={2}>
              xxx
            </BoxTypography>
          </Grid>
          <Grid item container direction="column" xs={2} alignItems="center">
            <ResultsIcon />
            <BoxTypography variant="caption" mt={-1} mb={2}>
              xxx
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
          >
            REQUEST TO JOIN
          </Button>
        )}
        <Divider className={classes.divider} />
        <BoxTypography
          variant="caption"
          align="left"
          ml="2px"
          color="textSecondary"
        >
          {props.date_created}
        </BoxTypography>
      </Paper>
    </Grid>
  );
}
