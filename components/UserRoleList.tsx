import React from "react";
import { SelectedUserRecords } from "@/types/local";
import Loader from "./Loader";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 560,
      margin: "auto",
      maxHeight: 270,
      overflowY: "auto",
      [theme.breakpoints.only("xs")]: {
        maxHeight: 480,
      },
    },
    flexGridItem: {
      display: "flex",
      backgroundColor: theme.palette.primary.light,
      borderBottom: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        justifyContent: "space-between",
        alignItems: "center",
      },
      [theme.breakpoints.only("xs")]: {
        flexDirection: "column",
        justifyContent: "center",
      },
    },
    listItem: {
      width: "100%",
      maxWidth: 360,
    },
    select: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 130,
      [theme.breakpoints.only("xs")]: {
        marginLeft: "72px",
        marginBottom: "12px",
        maxWidth: 200,
      },
    },
  })
);

interface UserRoleListProps {
  data: SelectedUserRecords[] | undefined;
  setState: React.Dispatch<
    React.SetStateAction<SelectedUserRecords[] | undefined>
  >;
  onDelete?: (userId: string) => void;
}

export default function UserRoleList(props: UserRoleListProps) {
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<{ value: any }>,
    userId: string
  ) => {
    props.setState((prev) =>
      prev?.map((user) => {
        if (user.uid === userId) {
          console.log("found");
          return { ...user, role: event.target.value };
        } else {
          return user;
        }
      })
    );
  };

  const unselectUser = (userId: string) => {
    props.setState((prev) => prev?.filter((user) => user.uid !== userId));
  };

  if (!props.data) {
    return <Loader isLocal={true} />;
  }

  return (
    <Grid container justify="space-evenly" className={classes.container}>
      {props.data.map((user) => (
        <Grid item xs={12} className={classes.flexGridItem} key={user.uid}>
          <ListItem
            className={classes.listItem}
            component="div"
            ContainerComponent="div"
            ContainerProps={{ style: { flexGrow: 1 } }}
            dense={true}
          >
            <ListItemAvatar>
              <Avatar src={user.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              primary={user.username}
              secondary={user.email}
              secondaryTypographyProps={{ noWrap: true }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                size="small"
                onClick={() => {
                  !props.onDelete
                    ? unselectUser(user.uid)
                    : props.onDelete(user.uid);
                }}
              >
                <DeleteIcon style={{ fontSize: 24 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <TextField
            value={user.role}
            select
            onChange={(e) => handleChange(e, user.uid)}
            color="secondary"
            size="small"
            defaultValue={"Observer"}
            className={classes.select}
          >
            <MenuItem value={"Manager"}>Manager</MenuItem>
            <MenuItem value={"Member"}>Member</MenuItem>
            <MenuItem value={"Observer"}>Observer</MenuItem>
          </TextField>
        </Grid>
      ))}
    </Grid>
  );
}
