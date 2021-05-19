import React from "react";
import { AdminCardProps } from "@/types/local";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import LinkIcon from "@material-ui/icons/LaunchRounded";
import CreatorIcon from "@material-ui/icons/OfflineBolt";
import AdminIcon from "@material-ui/icons/CheckCircle";
import Profile from "./Profile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    adminCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "auto",
      padding: theme.spacing(1, 2),
      minWidth: 180,
      maxWidth: 200,
      border: `1px solid ${theme.palette.primary.main}`,
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    adminAvatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      marginBottom: theme.spacing(1),
      height: 64,
      width: 64,
    },
    chip: {
      fontWeight: 600,
      padding: "0px 2px 1px",
      marginBottom: theme.spacing(2),
    },
    usernameBtn: {
      padding: "2px 8px",
      minWidth: 0,
    },
  })
);

export default function AdminCard(props: AdminCardProps): React.ReactElement {
  const classes = useStyles();
  const { uid, avatar_url, full_name, username, isCreator } = props;
  return (
    <Grid item xs={12} sm={4} md={3} key={uid}>
      <Paper elevation={3} className={classes.adminCard}>
        {isCreator ? (
          <Chip
            icon={<CreatorIcon />}
            label="Creator"
            color="secondary"
            size="small"
            className={classes.chip}
          />
        ) : (
          <Chip
            icon={<AdminIcon />}
            label="Admin"
            color="primary"
            size="small"
            className={classes.chip}
          />
        )}
        <Avatar className={classes.adminAvatar} src={avatar_url} />
        <Typography variant="caption" gutterBottom>
          <strong>{full_name}</strong>
        </Typography>
        <Profile userName={username}>
          {/* <div className={classes.userprofileBtn}>
            <Typography variant="inherit" noWrap>
              {username}
            </Typography>
            <LinkIcon style={{ margin: "0px 0px -6px 12px", fontSize: 18 }} />
          </div> */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<LinkIcon />}
            className={classes.usernameBtn}
          >
            {username}
          </Button>
        </Profile>
      </Paper>
    </Grid>
  );
}
